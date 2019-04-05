import { expect } from 'chai';
import { HTTPAction } from '../../../src';
import { IRouterMatcher, Application } from 'express';

class MockHTTPAction extends HTTPAction {
    public getExpressMethod(): IRouterMatcher<Application> {
        return null;
    }
}

describe('HTTPAction', () => {
    let mockHTTPAction: MockHTTPAction;

    beforeEach(() => {
        mockHTTPAction = new MockHTTPAction(null, null);
    });

    it('should be created', () => {
        expect(mockHTTPAction).to.be.ok;
    });
});
