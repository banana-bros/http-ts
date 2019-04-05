import { expect } from 'chai';
import { HTTPConnectAction } from '../../../src/controller/helper/HTTPConnectAction';

describe('HTTPConnectAction', () => {
    let httpConnectAction: HTTPConnectAction;

    beforeEach(() => {
        httpConnectAction = new HTTPConnectAction(null, null);
    });

    it('should be created', () => {
        expect(httpConnectAction).to.be.ok;
    });
});
