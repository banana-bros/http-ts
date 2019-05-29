import { Authenticator } from './Authenticator';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Repository } from '../repository/Repository';
import { HTTP_STATUS } from '../enum/HTTP_STATUS';

export class JWTAuthenticator<T> extends Authenticator {
    private repository: Repository<T[]>;
    private identificationKey: keyof T;
    private passwordKey: keyof T;
    private secret: string;

    constructor(repository: Repository<T[]>, identificationKey: keyof T, passwordKey: keyof T, secret: string, path?: string) {
        super(path);

        this.repository = repository;
        this.identificationKey = identificationKey;
        this.passwordKey = passwordKey;
        this.secret = secret;
    }

    public isAuthenticated(request: Request, response: Response): boolean {
        const authorizationHeader = request.headers['authorization'] as string;
        let statusCode = HTTP_STATUS.CODE_401_UNAUTHORIZED;

        if (authorizationHeader) {
            statusCode = this.parseAuthorizationHeader(authorizationHeader);
        }

        response.status(statusCode).send();
        return statusCode === HTTP_STATUS.CODE_200_OK;
    }

    private parseAuthorizationHeader(authorizationHeader: string) {
        try {
            const authorization = authorizationHeader.split(' ');
            this.checkAuthorizationBearer(authorization);
        } catch (err) {
            return HTTP_STATUS.CODE_403_FORBIDDEN;
        }
    }

    private checkAuthorizationBearer(authorization: string[]): number {
        if (authorization[0] !== 'Bearer') {
            return HTTP_STATUS.CODE_401_UNAUTHORIZED;
        } else {
            jwt.verify(authorization[1], this.secret);
            return HTTP_STATUS.CODE_200_OK;
        }
    }

    public authenticate(request: Request, response: Response): void {
        const loginToken = this.getLoginToken(request, response);
        const result = {
            auth: (loginToken != null),
            token: loginToken
        };

        if (result.auth) {
            response.status(HTTP_STATUS.CODE_200_OK).json(result);
        } else {
            response.status(HTTP_STATUS.CODE_401_UNAUTHORIZED).json(result);
        }
    }

    private getLoginToken(request: Request, response: Response): string {
        const identification = request.body[this.identificationKey];
        const password = request.body[this.passwordKey];
        const foundUser = this.repository.getData().find(user => user[this.identificationKey] === identification);

        if (!foundUser) {
            return null;
        }

        const passwordIsValid = bcrypt.compareSync(password, foundUser[this.passwordKey].toString());

        if (!passwordIsValid) {
            return null;
        }

        const token = jwt.sign({ identification: identification }, this.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    }

    public unauthenticate(request: Request, response: Response): void {

    }
}
