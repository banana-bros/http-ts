import { expect } from 'chai';
import { HttpPost } from '../../../../src';

class MockHttpMethod {
    @HttpPost('some/path')
    public test() {

    }
}

describe('HttpPost', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
