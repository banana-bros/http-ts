import { RequestHandler } from 'express';
import { HttpServer } from 'src/http';

export abstract class HttpAction {
    public path: string;
    public method: string;

    constructor(path: string, method: string) {
        this.path = path;
        this.method = method;
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
