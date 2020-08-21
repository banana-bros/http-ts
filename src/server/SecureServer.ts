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
        authenticator: Authenticator = new NoAuthenticator(),
        logger?: winston.Logger) {

        super(port, authenticator, logger);
        this.certificate = certificate;
        this.key = key;
    }

    public getCertificate(): Certificate {
        return this.certificate;
    }

    public setCertificate(certificate: Certificate) {
        if (this.isRunning()) {
            throw Error('Unable to set certificate as server is still running');
        }
        this.certificate = certificate;
    }

    public getKey(): Key {
        return this.key;
    }

    public setKey(key: Key) {
        if (this.isRunning()) {
            throw Error('Unable to set key as server is still running');
        }
        this.key = key;
    }
}
