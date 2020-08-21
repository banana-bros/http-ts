import * as http from 'http';
import { Server } from '../server/Server';
import { NoAuthenticator, HttpAuthenticator } from '../authenticator';
import winston = require('winston');
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';

export class HttpServer extends Server<http.Server> {
    protected express: Express;
    protected headers: Map<string, string>;

    constructor(port: number = 80,
        authenticator: HttpAuthenticator = new NoAuthenticator(),
        headers: Map<string, string> = new Map(),
        logger?: winston.Logger) {
        super(port, authenticator, logger);

        this.headers = headers;
    }

    protected createServer() {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use((request: Request, response: Response, next: NextFunction) => {
            for (const key of this.headers.keys()) {
                response.header(key, this.headers.get(key));
            }

            return next();
        });

        this.logger.info(`${this.constructor.name}: Server created`);

        this.express.use((request: Request, response: Response, next: NextFunction) => {
            this.logger.debug(`Request: ${request.method} ${request.url}`);
            next();
        });
    }

    public start(): void {
        this.server = http.createServer(this.express);

        this.server.on('close', () => this.closed.next());
        this.server.on('connection', () => this.connected.next());
        this.server.on('error', (error: Error) => this.error.next(error));
        this.server.on('listening', () => this.listening.next());

        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }

    public getExpress(): Express {
        return this.express;
    }
}
