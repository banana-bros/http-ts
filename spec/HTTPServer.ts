import { expect } from 'chai';
import { HTTPServer } from '../src/HTTPServer';

describe('HTTPServer', () => {
    let httpServer: HTTPServer;

    beforeEach(() => {
        httpServer = new HTTPServer(110);
    });

    it('should be created', () => {
        expect(httpServer).to.be.ok;
    });
});
