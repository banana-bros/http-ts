import { Server } from './Server';
import { Authorizer, NoAuthorizer } from './authorizer';

export abstract class SecureServer<T> extends Server<T> {
    protected certificate: string | Buffer | (string | Buffer)[];
    protected key: string | Buffer | (string | Buffer)[];

    constructor(port: number,
        certificate: string | Buffer | (string | Buffer)[],
        key: string | Buffer | (string | Buffer)[],
        authorizer: Authorizer = new NoAuthorizer()) {

        super(port, authorizer);
        this.certificate = certificate;
        this.key = key;
    }
}
