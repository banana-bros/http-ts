import { HTTPTrace } from '../../../../../src/rest/controller/decorator/http_method/HTTPTrace';

class MockHTTPMethod {
    @HTTPTrace('some/path')
    public test() {

    }
}

describe('HTTPTrace', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
