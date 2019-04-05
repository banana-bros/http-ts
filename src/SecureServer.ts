import { Server } from './Server';

export abstract class SecureServer<T> extends Server<T> {
    protected certificate: string | Buffer | (string | Buffer)[];
    protected key: string | Buffer | (string | Buffer)[];

    constructor(port: number, certificate: string | Buffer | (string | Buffer)[], key: string | Buffer | (string | Buffer)[]) {
        super(port);
        this.certificate = certificate;
        this.key = key;
    }
}
