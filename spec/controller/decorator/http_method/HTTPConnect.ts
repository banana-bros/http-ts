import { expect } from 'chai';
import { HTTPConnect } from '../../../../src/controller/decorator/http_method/HTTPConnect';

class MockHTTPMethod {
    @HTTPConnect('some/path')
    public test() {

    }
}

describe('HTTPConnect', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).to.be.ok;
    });
});
