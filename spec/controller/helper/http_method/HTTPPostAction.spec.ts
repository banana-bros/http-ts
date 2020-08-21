import { expect } from 'chai';
import { HttpPostAction } from '../../../../src';

describe('HttpPostAction', () => {
    let httpPostAction: HttpPostAction;

    beforeEach(() => {
        httpPostAction = new HttpPostAction(null, null);
    });

    it('should be created', () => {
        expect(httpPostAction).to.be.ok;
    });
});
