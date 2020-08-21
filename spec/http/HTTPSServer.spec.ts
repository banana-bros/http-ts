import { expect } from 'chai';
import { HttpsServer } from '../../src';

describe('HttpsServer', () => {
    let httpsServer: HttpsServer;

    beforeEach(() => {
        httpsServer = new HttpsServer('certs/server.crt', 'certs/server.key', 110);
    });

    it('should be created', () => {
        expect(httpsServer).to.be.ok;
    });
});
