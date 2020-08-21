import { RequestHandler } from 'express';
import { HttpServer } from 'src/http';
import { Action } from '../Action';

export abstract class HttpAction extends Action {
    public path: string;

    constructor(path: string, method: string) {
        super(method);
        this.path = path;
    }

    public getServerMethod(httpServer: HttpServer): (path: string, ...handlers: RequestHandler[]) => void {
        const methodName = this.getMethodName();

        if (!httpServer.getExpress() || !httpServer.getExpress()[methodName]) {
            throw new Error(`Server Method ${methodName} not found`);
        }
        return httpServer.getExpress()[methodName].bind(httpServer.getExpress());
    }

    protected abstract getMethodName(): string;
}
