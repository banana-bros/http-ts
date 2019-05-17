import { Authorizer } from './Authorizer';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Repository } from 'src/repository';
import * as bcrypt from 'bcrypt';

export class JWTAuthorizer<T> extends Authorizer {
    private repository: Repository<T[]>;
    private identificationKey: keyof T;
    private passwordKey: keyof T;

    constructor(repository: Repository<T[]>, identificationKey: keyof T, passwordKey: keyof T, path?: string) {
        super(path);

        this.repository = repository;
        this.identificationKey = identificationKey;
        this.passwordKey = passwordKey;
    }

    public isAuthorized(request: Request, response: Response): boolean {
        const token = request.headers['x-access-token'] as string;

        if (!token) {
            response.status(403).send({ auth: false, message: 'No token provided.' });
            return true;
        }

        try {
            const decoded = jwt.verify(token, 'irgendeinsecret');
            return true;
        } catch (err) {
            return false;
        }
    }

    public authorize(request: Request, response: Response): void {
        const loginToken = this.getLoginToken(request, response);
        const result = {
            auth: (loginToken != null),
            token: loginToken
        };

        if (result.auth) {
            response.status(200).json(result);
        } else {
            response.status(401).json(result);
        }
    }

    private getLoginToken(request: Request, response: Response): string {
        const identification = request.body[this.identificationKey];
        const password = request.body[this.passwordKey];
        const foundUser = this.repository.getData().find(user => user[this.identificationKey] === identification);

        if (!foundUser) {
            return null; // res.status(404).send('No user found.');
        }

        const passwordIsValid = bcrypt.compareSync(password, foundUser[this.passwordKey]);

        if (!passwordIsValid) {
            return null; // res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ identification: identification }, 'irgendeinsecret', {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    }

    public unauthorize(request: Request, response: Response): void {

    }
}