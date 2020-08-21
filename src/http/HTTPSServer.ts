import * as https from 'https';
import { SecureServer } from '../server/SecureServer';
import { Authenticator, NoAuthenticator } from '../authenticator';
import * as winston from 'winston';
import { KeyObject } from 'tls';

export class HTTPSServer extends SecureServer<https.Server> {
    protected httpsServer: https.Server;

    constructor(certificate: string | Buffer | (string | Buffer)[],
        key: string | Buffer | (Buffer | KeyObject)[],
        port: number = 443,
        authenticator: Authenticator = new NoAuthenticator(),
        logger?: winston.Logger) {

        super(certificate, key, port, authenticator, logger);
    }

    protected createServer(): void {
        this.server = https.createServer({
            cert: this.certificate,
            key: this.key,
            rejectUnauthorized: false,
        }, this.express);

        this.logger.info(`${this.constructor.name}: Server created`);
    }

    public start(): void {
        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }
}
