import { HTTPPost } from '../../../../../src/rest/controller/decorator/http_method/HTTPPost';

class MockHTTPMethod {
    @HTTPPost('some/path')
    public test() {

    }
}

describe('HTTPPost', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
