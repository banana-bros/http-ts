import * as https from 'https';
import { SecureServer } from './SecureServer';
import { Authenticator, NoAuthenticator } from './authenticator';
import { first } from 'rxjs/operators';
import * as winston from 'winston';

export class HTTPSServer extends SecureServer<https.Server> {
    protected httpsServer: https.Server;

    constructor(port: number = 443,
        certificate: string | Buffer | (string | Buffer)[],
        key: string | Buffer | (string | Buffer)[],
        authenticator: Authenticator = new NoAuthenticator(),
        logger?: winston.Logger) {

        super(port, certificate, key, authenticator, logger);
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
