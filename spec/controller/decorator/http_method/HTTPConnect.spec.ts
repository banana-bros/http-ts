import { expect } from 'chai';
import { HttpConnect } from '../../../../src';

class MockHttpMethod {
    @HttpConnect('some/path')
    public test() {

    }
}

describe('HttpConnect', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
