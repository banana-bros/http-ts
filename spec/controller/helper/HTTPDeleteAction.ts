import { expect } from 'chai';
import { HTTPDeleteAction } from '../../../src/controller/helper/HTTPDeleteAction';

describe('HTTPDeleteAction', () => {
    let httpDeleteAction: HTTPDeleteAction;

    beforeEach(() => {
        httpDeleteAction = new HTTPDeleteAction(null, null);
    });

    it('should be created', () => {
        expect(httpDeleteAction).to.be.ok;
    });
});
