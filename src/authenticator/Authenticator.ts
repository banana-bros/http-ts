import { Response, Request } from 'express';

export abstract class Authenticator {
    protected path: string;

    constructor(path?: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public abstract isAuthenticated(request: Request, response: Response): boolean;
    public abstract authenticate(request: Request, response: Response): void;
    public abstract unauthenticate(request: Request, response: Response): void;
}
