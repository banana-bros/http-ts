import { Subject } from 'rxjs';
import * as express from 'express';
import { Controller } from './controller/Controller';
import bodyParser = require('body-parser');

export abstract class Server<T> {
    public onClose: Subject<null> = new Subject();
    public onConnection: Subject<null> = new Subject();
    public onError: Subject<Error> = new Subject();
    public onListen: Subject<null> = new Subject();

    private _port: number;
    get port(): number {
        return this._port;
    }

    set port(port: number) {
        this._port = port;
    }

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

    public getExpress(): express.Express {
        return this.express;
    }

    public registerController(controller: Controller<any>): Server<T> {
        this.controllers.push(controller);
        controller.registerActions(this);
        return this;
    }
}
