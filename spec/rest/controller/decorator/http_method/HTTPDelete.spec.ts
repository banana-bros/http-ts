import { HTTPDelete } from '../../../../../src/rest/controller/decorator/http_method/HTTPDelete';

class MockHTTPMethod {
    @HTTPDelete('some/path')
    public test() {

    }
}

describe('HTTPDelete', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
