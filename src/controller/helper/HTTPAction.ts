import { Server } from '../../Server';
import { RequestHandler } from 'express';

export abstract class HTTPAction {
    public path: string;
    public method: string;

    constructor(path: string, method: string) {
        this.path = path;
        this.method = method;
    }

    public getServerMethod(server: Server<any>): (path: string, ...handlers: RequestHandler[]) => void {
        const serverMethodName = this.getServerMethodName();
        if (!server[serverMethodName]) {
            throw new Error(`Server Method ${serverMethodName} not found`);
        }
        return server.getExpress()[serverMethodName].bind(server);
    }

    protected abstract getServerMethodName(): string;
}
