import { expect } from 'chai';
import { HTTPPostAction } from '../../../src/controller/helper/HTTPPostAction';

describe('HTTPPostAction', () => {
    let httpPostAction: HTTPPostAction;

    beforeEach(() => {
        httpPostAction = new HTTPPostAction(null, null);
    });

    it('should be created', () => {
        expect(httpPostAction).to.be.ok;
    });
});
