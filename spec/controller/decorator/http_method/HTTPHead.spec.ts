import { expect } from 'chai';
import { HttpHead } from '../../../../src';

class MockHttpMethod {
    @HttpHead('some/path')
    public test() {

    }
}

describe('HttpHead', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
