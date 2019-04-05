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
        this.express.get(path, handlers);
        return this;
    }

    public head(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.head(path, handlers);
        return this;
    }

    public post(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.post(path, handlers);
        return this;
    }

    public put(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.put(path, handlers);
        return this;
    }

    public delete(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.delete(path, handlers);
        return this;
    }

    public connect(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.connect(path, handlers);
        return this;
    }

    public options(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.options(path, handlers);
        return this;
    }

    public trace(path: string, ...handlers: express.RequestHandler[]): Server<T> {
        this.express.trace(path, handlers);
        return this;
    }
}
