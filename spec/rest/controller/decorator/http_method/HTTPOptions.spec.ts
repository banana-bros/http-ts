import { HTTPOptions } from '../../../../../src/rest/controller/decorator/http_method/HTTPOptions';

class MockHTTPMethod {
    @HTTPOptions('some/path')
    public test() {

    }
}

describe('HTTPOptions', () => {
    let mockHTTPMethod: MockHTTPMethod;

    beforeEach(() => {
        mockHTTPMethod = new MockHTTPMethod();
    });

    it('should be created', () => {
        expect(mockHTTPMethod).toBeTruthy();
    });
});
