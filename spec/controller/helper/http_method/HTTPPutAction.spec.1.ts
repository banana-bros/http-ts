import { expect } from 'chai';
import { HttpPatchAction } from '../../../../src';

describe('HttpPatchAction', () => {
    let httpPutAction: HttpPatchAction;

    beforeEach(() => {
        httpPutAction = new HttpPatchAction(null, null);
    });

    it('should be created', () => {
        expect(httpPutAction).to.be.ok;
    });
});
