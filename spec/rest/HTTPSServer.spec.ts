import { HTTPSServer } from '../../src/rest/HTTPSServer';

describe('HTTPSServer', () => {
    let httpsServer: HTTPSServer;

    beforeEach(() => {
        httpsServer = new HTTPSServer(1, '', '');
    });

    it('should be created', () => {
        expect(httpsServer).toBeTruthy();
    });
});
