import * as https from 'https';
import { Server } from './Server';
import { SecureServer } from './SecureServer';

export class HTTPSServer extends SecureServer<https.Server> {
    protected httpsServer: https.Server;

    constructor(port: number = 443, certificate: string | Buffer | (string | Buffer)[], key: string | Buffer | (string | Buffer)[]) {
        super(port, certificate, key);
    }

    protected createServer(): void {
        this.server = https.createServer({
            cert: this.certificate,
            key: this.key,
            rejectUnauthorized: false,
        }, this.express);
    }

    public start(): void {
        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }
}
