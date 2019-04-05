import { HTTPGet } from '../../../../../src/rest/controller/decorator/http_method/HTTPGet';

class MockHTTPMethod {
    @HTTPGet('some/path')
    public test() {

    }
}

describe('HTTPGet', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
