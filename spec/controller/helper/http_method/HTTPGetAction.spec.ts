import { expect } from 'chai';
import { HttpGetAction } from '../../../../src';

describe('HttpGetAction', () => {
    let httpGetAction: HttpGetAction;

    beforeEach(() => {
        httpGetAction = new HttpGetAction(null, null);
    });

    it('should be created', () => {
        expect(httpGetAction).to.be.ok;
    });
});
