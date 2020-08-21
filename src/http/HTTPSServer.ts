import * as https from 'https';
import { SecureServer } from '../server/SecureServer';
import { NoAuthenticator } from '../authenticator';
import * as winston from 'winston';
import { KeyObject } from 'tls';
import { HttpAuthenticator } from 'src/authenticator/HttpAuthenticator';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';

export class HttpsServer extends SecureServer<https.Server> {
    protected httpsServer: https.Server;
    protected express: Express;

    constructor(certificate: string | Buffer | (string | Buffer)[],
        key: string | Buffer | (Buffer | KeyObject)[],
        port: number = 443,
        authenticator: HttpAuthenticator = new NoAuthenticator(),
        logger?: winston.Logger) {

        super(certificate, key, port, authenticator, logger);
        
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    protected createServer(): void {
        this.server = https.createServer({
            cert: this.certificate,
            key: this.key,
            rejectUnauthorized: false,
        }, this.express);

        this.logger.info(`${this.constructor.name}: Server created`);
    }

    public setPermanentHeaders(headers: Map<string, string>): void {
        this.express.use((request: Request, response: Response, next: NextFunction) => {
            for (const key in headers.keys()) {
                response.header(key, headers.get(key));    
            }
            
            next();
        });
    }

    public start(): void {
        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }

    public getExpress(): Express {
        return this.express;
    }
}
