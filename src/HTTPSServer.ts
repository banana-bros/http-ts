import * as https from 'https';
import { Server } from './Server';

export class HTTPSServer extends Server<https.Server> {
    protected certificate: string | Buffer | (string | Buffer)[];
    protected key: string | Buffer | (string | Buffer)[];
    protected httpsServer: https.Server;

    constructor(port: number, certificate: string | Buffer | (string | Buffer)[], key: string | Buffer | (string | Buffer)[]) {
        super(port);
        this.certificate = certificate;
        this.key = key;
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
