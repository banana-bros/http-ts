import * as http from 'http';
import { Server } from './Server';
import { Authenticator, NoAuthenticator } from './authenticator';
import { first } from 'rxjs/operators';
import winston = require('winston');

export class HTTPServer extends Server<http.Server> {
    constructor(port: number = 80,
        authenticator: Authenticator = new NoAuthenticator(),
        logger?: winston.Logger) {
        super(port, authenticator, logger);
    }

    protected createServer() {
        this.server = http.createServer(this.express);

        this.server.on('close', () => this.onClose.next());
        this.server.on('connection', () => this.onConnection.next());
        this.server.on('error', (error: Error) => this.onError.next(error));
        this.server.on('listening', () => this.onListen.next());

        this.logger.info(`${this.constructor.name}: Server created`);
    }

    public start(): void {
        this.onListen.pipe(
            first()
        )
        .subscribe(_ => this.logger.info(`${this.constructor.name}: Listening on port ${this.port}`));

        this.server.listen(this.port);
    }

    public stop(): void {
        this.onClose.pipe(
            first()
        )
        .subscribe(_ => this.logger.info(`${this.constructor.name}: Server closed`));

        this.server.close();
    }
}
