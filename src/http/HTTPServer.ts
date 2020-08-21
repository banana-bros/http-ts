import * as http from 'http';
import { Server } from '../server/Server';
import { Authenticator, NoAuthenticator } from '../authenticator';
import winston = require('winston');

export class HTTPServer extends Server<http.Server> {
    constructor(port: number = 80,
        authenticator: Authenticator = new NoAuthenticator(),
        logger?: winston.Logger) {
        super(port, authenticator, logger);
    }

    protected createServer() {
        this.server = http.createServer(this.express);

        this.server.on('close', () => this.closed.next());
        this.server.on('connection', () => this.connected.next());
        this.server.on('error', (error: Error) => this.error.next(error));
        this.server.on('listening', () => this.listening.next());

        this.logger.info(`${this.constructor.name}: Server created`);
    }

    public start(): void {
        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }
}
