import { HTTPConnect } from '../../../../../src/rest/controller/decorator/http_method/HTTPConnect';

class MockHTTPMethod {
    @HTTPConnect('some/path')
    public test() {

    }
}

describe('HTTPConnection', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
