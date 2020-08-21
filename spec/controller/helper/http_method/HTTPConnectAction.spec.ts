import { expect } from 'chai';
import { HttpConnectAction } from '../../../../src';

describe('HttpConnectAction', () => {
    let httpConnectAction: HttpConnectAction;

    beforeEach(() => {
        httpConnectAction = new HttpConnectAction(null, null);
    });

    it('should be created', () => {
        expect(httpConnectAction).to.be.ok;
    });
});
