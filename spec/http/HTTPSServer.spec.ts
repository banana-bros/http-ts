import { expect } from 'chai';
import { HTTPSServer } from '../../src';

describe('HTTPSServer', () => {
    let httpsServer: HTTPSServer;

    beforeEach(() => {
        httpsServer = new HTTPSServer('certs/server.crt', 'certs/server.key', 110);
    });

    it('should be created', () => {
        expect(httpsServer).to.be.ok;
    });
});
