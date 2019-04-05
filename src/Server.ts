import { Subject } from 'rxjs';
import * as express from 'express';
import { Controller } from './controller/Controller';
import bodyParser = require('body-parser');

export abstract class Server<T> {
    public onClose: Subject<null> = new Subject();
    public onConnection: Subject<null> = new Subject();
    public onError: Subject<Error> = new Subject();
    public onListen: Subject<null> = new Subject();

    protected port: number;
    protected express: express.Express;
    protected server: T;
    protected controllers: Controller<any>[] = [];

    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.createServer();
    }

    public abstract start(): void;
    public abstract stop(): void;
    protected abstract createServer(): void;

    public getServer(): T {
        return this.server;
    }

    public registerController(controller: Controller<any>): Server<T> {
        this.controllers.push(controller);
        controller.registerActions(this);
        return this;
    }

    public get(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.get, path, handlers);
    }

    public head(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.head, path, handlers);
    }

    public post(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.post, path, handlers);
    }

    public put(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.put, path, handlers);
    }

    public delete(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.delete, path, handlers);
    }

    public connect(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.connect, path, handlers);
    }

    public options(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.options, path, handlers);
    }

    public trace(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        return this.callMethod(this.express.trace, path, handlers);
    }

    protected callMethod(method: express.IRouterMatcher<express.Express>, path: string, handlers: express.RequestHandler[]): Server<T> {
        method(path, handlers);
        return this;
    }
}
