import { expect } from 'chai';
import { HttpPut } from '../../../../src';

class MockHttpMethod {
    @HttpPut('some/path')
    public test() {

    }
}

describe('HttpPut', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
