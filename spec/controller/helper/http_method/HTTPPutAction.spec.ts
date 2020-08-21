import { expect } from 'chai';
import { HttpPutAction } from '../../../../src';

describe('HttpPutAction', () => {
    let httpPutAction: HttpPutAction;

    beforeEach(() => {
        httpPutAction = new HttpPutAction(null, null);
    });

    it('should be created', () => {
        expect(httpPutAction).to.be.ok;
    });
});
