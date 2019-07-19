import { Authenticator } from './Authenticator';
import { HTTPResponse } from 'src/controller/helper/HTTPResponse';
import { Request, Response } from 'express';

export class NoAuthenticator extends Authenticator {
    public isAuthenticated(request: Request, response: Response): boolean {
        return true;
    }

    public authenticate(request: Request, response: Response): HTTPResponse {
        return null;
    }

    public unauthenticate(request: Request, response: Response): void {

    }
}
