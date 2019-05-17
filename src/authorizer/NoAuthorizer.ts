import { Authorizer } from './Authorizer';
import { Response, Request } from 'express';

export class NoAuthorizer extends Authorizer {
    public isAuthorized(request: Request, response: Response): boolean {
        return true;
    }

    public authorize(request: Request, response: Response): void {

    }

    public unauthorize(request: Request, response: Response): void {

    }
}
