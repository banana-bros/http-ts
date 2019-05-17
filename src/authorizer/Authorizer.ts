import { Response, Request } from 'express';

export abstract class Authorizer {
    public abstract isAuthorized(request: Request, response: Response): boolean;
    public abstract authorize(request: Request, response: Response): void;
    public abstract unauthorize(request: Request, response: Response): void;
}
