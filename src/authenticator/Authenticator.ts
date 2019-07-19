import { Response, Request } from 'express';
import { HTTPResponse } from 'src/controller/helper/HTTPResponse';

export abstract class Authenticator {
    protected path: string;

    constructor(path?: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public abstract isAuthenticated(request: Request, response: Response): boolean;
    public abstract authenticate(request: Request, response: Response): HTTPResponse;
    public abstract unauthenticate(request: Request, response: Response): void;
}
