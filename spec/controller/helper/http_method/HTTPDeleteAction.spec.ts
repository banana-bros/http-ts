import { expect } from 'chai';
import { HttpDeleteAction } from '../../../../src';

describe('HttpDeleteAction', () => {
    let httpDeleteAction: HttpDeleteAction;

    beforeEach(() => {
        httpDeleteAction = new HttpDeleteAction(null, null);
    });

    it('should be created', () => {
        expect(httpDeleteAction).to.be.ok;
    });
});
