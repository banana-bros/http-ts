import { expect } from 'chai';
import { HttpServer } from '../../src';

describe('HttpServer', () => {
    let httpServer: HttpServer;

    beforeEach(() => {
        httpServer = new HttpServer(110);
    });

    it('should be created', () => {
        expect(httpServer).to.be.ok;
    });
});
