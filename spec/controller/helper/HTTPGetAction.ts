import { expect } from 'chai';
import { HTTPGetAction } from '../../../src/controller/helper/HTTPGetAction';

describe('HTTPGetAction', () => {
    let httpGetAction: HTTPGetAction;

    beforeEach(() => {
        httpGetAction = new HTTPGetAction(null, null);
    });

    it('should be created', () => {
        expect(httpGetAction).to.be.ok;
    });
});
