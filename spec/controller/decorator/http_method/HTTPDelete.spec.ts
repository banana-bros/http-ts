import { expect } from 'chai';
import { HttpDelete } from '../../../../src';

class MockHttpMethod {
    @HttpDelete('some/path')
    public test() {

    }
}

describe('HttpDelete', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
