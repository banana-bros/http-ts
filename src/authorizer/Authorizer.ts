import { Response, Request } from 'express';

export abstract class Authorizer {
    protected path: string;

    constructor(path?: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public abstract isAuthorized(request: Request, response: Response): boolean;
    public abstract authorize(request: Request, response: Response): void;
    public abstract unauthorize(request: Request, response: Response): void;
}
