import { IRouterMatcher, Application } from 'express';
import { Server } from '../../../server/Server';
import { RequestHandler } from 'express';

export abstract class HTTPAction {
    public path: string;
    public method: string;

    constructor(path: string, method: string) {
        this.path = path;
        this.method = method;
    }

    public getServerMethod(server: Server<any>): (path: string, ...handlers: RequestHandler[]) => void {
        const methodName = this.getMethodName();

        if (!server.getExpress() || !server.getExpress()[methodName]) {
            throw new Error(`Server Method ${methodName} not found`);
        }
        return server.getExpress()[methodName].bind(server.getExpress());
    }

    protected abstract getMethodName(): string;
}
