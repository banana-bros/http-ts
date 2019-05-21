import { Server } from './Server';
import { Authenticator, NoAuthenticator } from './authenticator';

export abstract class SecureServer<T> extends Server<T> {
    protected certificate: string | Buffer | (string | Buffer)[];
    protected key: string | Buffer | (string | Buffer)[];

    constructor(port: number,
        certificate: string | Buffer | (string | Buffer)[],
        key: string | Buffer | (string | Buffer)[],
        authenticator: Authenticator = new NoAuthenticator()) {

        super(port, authenticator);
        this.certificate = certificate;
        this.key = key;
    }
}
