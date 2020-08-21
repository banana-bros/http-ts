import { expect } from 'chai';
import { HttpAction } from '../../../../src';

class MockHttpAction extends HttpAction {
    public getMethodName(): string {
        return null;
    }
}

describe('HttpAction', () => {
    let mockHttpAction: MockHttpAction;

    beforeEach(() => {
        mockHttpAction = new MockHttpAction(null, null);
    });

    it('should be created', () => {
        expect(mockHttpAction).to.be.ok;
    });
});
