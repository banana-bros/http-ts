import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Controller } from '../controller/Controller';
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
    protected authenticator: Authenticator<any, any>;
    protected server: T;
    protected controllers: Controller<any, any, any, any>[] = [];

    private running = false;

    constructor(port: number, authenticator: Authenticator<any, any> = new NoAuthenticator(), logger: Logger = defaultLogger) {
        this.port = port;
        this.authenticator = authenticator;
        this.logger = logger;

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

    public isAuthenticated(options): boolean {
        return this.authenticator.isAuthenticated(options);
    }

    public registerController(controller: Controller<any, any, any, any>): Server<T> {
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

    public getAuthenticator(): Authenticator<any, any> {
        return this.authenticator;
    }

    public setAuthenticator(authenticator: Authenticator<any, any>) {
        this.authenticator = authenticator;
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
