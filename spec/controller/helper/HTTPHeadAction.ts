import { expect } from 'chai';
import { HTTPHeadAction } from '../../../src/controller/helper/HTTPHeadAction';

describe('HTTPHeadAction', () => {
    let httpHeadAction: HTTPHeadAction;

    beforeEach(() => {
        httpHeadAction = new HTTPHeadAction(null, null);
    });

    it('should be created', () => {
        expect(httpHeadAction).to.be.ok;
    });
});
