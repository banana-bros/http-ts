import { expect } from 'chai';
import { HttpHeadAction } from '../../../../src';

describe('HttpHeadAction', () => {
    let httpHeadAction: HttpHeadAction;

    beforeEach(() => {
        httpHeadAction = new HttpHeadAction(null, null);
    });

    it('should be created', () => {
        expect(httpHeadAction).to.be.ok;
    });
});
