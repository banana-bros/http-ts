import { Subject } from 'rxjs';
import * as express from 'express';
import { Controller } from './controller/Controller';
import bodyParser = require('body-parser');
import { Exception } from 'handlebars';
import { Authenticator, NoAuthenticator } from './authenticator';
import * as winston from 'winston';
import { first } from 'rxjs/operators';

const defaultLogger: winston.Logger = winston.createLogger({
    format: winston.format.cli(),
    transports: [
        new winston.transports.Console()
    ]
});

export abstract class Server<T> {
    public onClose: Subject<null> = new Subject();
    public onConnection: Subject<null> = new Subject();
    public onError: Subject<Error> = new Subject();
    public onListen: Subject<null> = new Subject();

    protected logger: winston.Logger;

    private isRunning = false;

    private _port: number;
    get port(): number {
        return this._port;
    }

    set port(port: number) {
        if (this.isRunning) {
            throw Exception('Unable to set port as server is still running');
        }
        this._port = port;
    }

    protected authenticator: Authenticator;
    protected express: express.Express;
    protected server: T;
    protected controllers: Controller<any>[] = [];

    constructor(port: number, authenticator: Authenticator = new NoAuthenticator(), logger: winston.Logger = defaultLogger) {
        this.port = port;
        this.authenticator = authenticator;
        this.logger = logger;

        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.createServer();
        this.registerAuthorization();
        this.startListening();
    }

    protected startListening(): void {
        this.onListen.subscribe(() => this.isRunning = true);
        this.onClose.subscribe(() => this.isRunning = false);

        this.onListen.pipe(
            first()
        )
        .subscribe(_ => this.logger.info(`${this.constructor.name}: Listening on port ${this.port}`));
        this.onClose.pipe(
            first()
        )
        .subscribe(_ => this.logger.info(`${this.constructor.name}: Server closed`));
    }

    public abstract start(): void;
    public abstract stop(): void;
    protected abstract createServer(): void;

    protected registerAuthorization(): void {
        const path = this.authenticator.getPath();
        const message = `${this.constructor.name}: ${this.authenticator.constructor.name} `;

        if (path) {
            this.express.post(this.authenticator.getPath(), (request: express.Request, response: express.Response) => {
                this.authenticator.authenticate(request, response);
            });

            this.logger.info(`${message} registered`);
        } else {
            this.logger.warn(`${message} could not be registered (no path)`);
        }
    }

    public isAuthenticated(request: express.Request, response: express.Response) {
        return this.authenticator.isAuthenticated(request, response);
    }

    public getServer(): T {
        return this.server;
    }

    public getExpress(): express.Express {
        return this.express;
    }

    public getLogger(): winston.Logger {
        return this.logger;
    }

    public registerController(controller: Controller<any>): Server<T> {
        this.controllers.push(controller);
        controller.registerActions(this);

        this.logger.info(`${this.constructor.name}: ${controller.constructor.name} registered`);
        return this;
    }
}
