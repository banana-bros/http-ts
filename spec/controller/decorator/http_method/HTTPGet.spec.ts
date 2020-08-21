import { expect } from 'chai';
import { HttpGet } from '../../../../src';

class MockHttpMethod {
    @HttpGet('some/path')
    public test() {

    }
}

describe('HttpGet', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
