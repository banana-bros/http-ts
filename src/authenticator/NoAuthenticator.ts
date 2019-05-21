import { Authenticator } from './Authenticator';
import { Response, Request } from 'express';

export class NoAuthenticator extends Authenticator {
    public isAuthenticated(request: Request, response: Response): boolean {
        return true;
    }

    public authenticate(request: Request, response: Response): void {

    }

    public unauthenticate(request: Request, response: Response): void {

    }
}
