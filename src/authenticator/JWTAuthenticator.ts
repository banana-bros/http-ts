import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { HttpResponse } from '../controller/helper/HttpResponse';
import { JwtAuthenticatorOptions } from './JwtAuthenticatorOptions';
import { HttpAuthenticator, HttpAuthenticationOptions } from './HttpAuthenticator';

export class JwtAuthenticator<T> extends HttpAuthenticator {
    private options: JwtAuthenticatorOptions<T>;

    constructor(path: string, options: JwtAuthenticatorOptions<T>) {
        super(path);

        this.options = options;
    }

    public isAuthenticated(options: HttpAuthenticationOptions): boolean {
        const authorizationHeader = options.request.headers['authorization'] as string;
        let isAuthenticated = false;

        if (authorizationHeader) {
            isAuthenticated = this.parseAuthorizationHeader(authorizationHeader);
        }

        return isAuthenticated;
    }

    private parseAuthorizationHeader(authorizationHeader: string): boolean {
        try {
            const authorization = authorizationHeader.split(' ');
            return this.checkAuthorizationBearer(authorization);
        } catch (err) {
            return false;
        }
    }

    private checkAuthorizationBearer(authorization: string[]): boolean {
        if (authorization[0] === 'Bearer') {
            jwt.verify(authorization[1], this.options.secret);
            return true;
        } else {
            return false;
        }
    }

    public authenticate(options: HttpAuthenticationOptions): HttpResponse {
        const loginToken = this.getLoginToken(options.request, options.response);
        const result = {
            auth: (loginToken != null),
            token: loginToken
        };

        if (result.auth) {
            return new HttpResponse(result);
        } else {
            return new HttpResponse(result, 401);
        }
    }

    private getLoginToken(request: Request, response: Response): string {
        const identification = request.body[this.options.identificationKey];
        const password = request.body[this.options.passwordKey];
        const foundUser = this.options.repository.getData().find(user => user[this.options.identificationKey] === identification);

        if (!foundUser) {
            return null;
        }

        const passwordIsValid = bcrypt.compareSync(password, foundUser[this.options.passwordKey].toString());

        if (!passwordIsValid) {
            return null;
        }

        const token = jwt.sign({ identification: identification }, this.options.secret, {
            expiresIn: this.options.expiresIn
        });

        return token;
    }

    public unauthenticate(options: HttpAuthenticationOptions): void {

    }
}
