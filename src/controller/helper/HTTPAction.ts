import { IRouterMatcher, Application } from 'express';
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
        const application = server.getExpress();
        const methodName = this.getMethodName();

        if (!application || !application[methodName]) {
            throw new Error(`Server Method ${methodName} not found`);
        }
        return application[methodName].bind(application);
    }

    protected abstract getMethodName(): string;
}
