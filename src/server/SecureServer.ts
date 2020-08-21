import { Server } from './Server';
import { Authenticator, NoAuthenticator } from '../authenticator';
import * as winston from 'winston';
import { KeyObject } from 'tls';

type Certificate = string | Buffer | (string | Buffer)[];
type Key = string | Buffer | (Buffer | KeyObject)[];

export abstract class SecureServer<T> extends Server<T> {
    protected certificate: Certificate;
    protected key: Key;

    constructor(certificate: Certificate,
        key: Key,
        port: number,
        authenticator: Authenticator<any, any> = new NoAuthenticator(),
        logger?: winston.Logger) {

        super(port, authenticator, logger);
        this.certificate = certificate;
        this.key = key;
    }

    public getCertificate(): Certificate {
        return this.certificate;
    }

    public getKey(): Key {
        return this.key;
    }

    public setCertificate(certificate: Certificate) {
        this.isPropertyChangeAllowed('certificate');
        this.certificate = certificate;
    }

    public setKey(key: Key) {
        this.isPropertyChangeAllowed('key');
        this.key = key;
    }

    protected isPropertyChangeAllowed(property: string): void {
        if (this.isRunning()) {
            throw Error(`Unable to change ${property} as server is still running`);
        }
    }
}
