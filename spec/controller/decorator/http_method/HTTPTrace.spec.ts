import { expect } from 'chai';
import { HttpTrace } from '../../../../src';

class MockHttpMethod {
    @HttpTrace('some/path')
    public test() {

    }
}

describe('HttpTrace', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
