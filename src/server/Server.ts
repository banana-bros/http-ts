import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as express from 'express';
import { Express, Request, Response } from 'express';
import { Controller } from '../controller/Controller';
import * as bodyParser from 'body-parser';
import { Authenticator, NoAuthenticator } from '../authenticator';
import * as winston from 'winston';
import { Logger, format, transports } from 'winston';

const defaultLogger: Logger = winston.createLogger({
    format: format.cli(),
    transports: [
        new transports.Console()
    ]
});

export abstract class Server<T> {
    public closed: Subject<null> = new Subject();
    public connected: Subject<null> = new Subject();
    public error: Subject<Error> = new Subject();
    public listening: Subject<null> = new Subject();

    protected port: number;
    protected logger: Logger;
    protected authenticator: Authenticator;
    protected express: Express;
    protected server: T;
    protected controllers: Controller<any>[] = [];

    private running = false;

    constructor(port: number, authenticator: Authenticator = new NoAuthenticator(), logger: Logger = defaultLogger) {
        this.port = port;
        this.authenticator = authenticator;
        this.logger = logger;

        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.error.subscribe((error: Error) => {
            this.logger.error(error);
        });

        this.createServer();
        this.registerAuthorization();
        this.startListening();
    }

    public abstract start(): void;
    public abstract stop(): void;
    protected abstract createServer(): void;

    protected startListening(): void {
        this.listening.subscribe(() => this.running = true);
        this.closed.subscribe(() => this.running = false);

        this.listening.pipe(
            first()
        ).subscribe(_ => this.logger.info(`${this.constructor.name}: Listening on port ${this.port}`));

        this.closed.pipe(
            first()
        ).subscribe(_ => this.logger.info(`${this.constructor.name}: Server closed`));
    }

    protected registerAuthorization(): void {
        this.authenticator.registerServer(this);
    }

    public isAuthenticated(request: Request, response: Response): boolean {
        return this.authenticator.isAuthenticated(request, response);
    }

    public registerController(controller: Controller<any>): Server<T> {
        this.controllers.push(controller);
        controller.registerActions(this);

        this.logger.info(`${this.constructor.name}: ${controller.constructor.name} registered`);
        return this;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number) {
        if (this.running) {
            throw Error('Unable to set port as server is still running');
        }
        this.port = port;
    }

    public getAuthenticator(): Authenticator {
        return this.authenticator;
    }

    public setAuthenticator(authenticator: Authenticator) {
        this.authenticator = authenticator;
    }

    public getExpress(): Express {
        return this.express;
    }

    public getServer(): T {
        return this.server;
    }

    public getLogger(): Logger {
        return this.logger;
    }

    public setLogger(logger: Logger): void {
        this.logger = logger;
    }

    public isRunning(): boolean {
        return this.running;
    }
}
