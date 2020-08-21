import { expect } from 'chai';
import { HttpPatch } from '../../../../src';

class MockHttpMethod {
    @HttpPatch('some/path')
    public test() {

    }
}

describe('HttpPatch', () => {
    let mockHttpMethod: MockHttpMethod;

    beforeEach(() => {
        mockHttpMethod = new MockHttpMethod();
    });

    it('should be created', () => {
        expect(mockHttpMethod).to.be.ok;
    });
});
