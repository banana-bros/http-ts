import { HTTPAction } from '../../../../src/rest/controller/helper/HTTPAction';

class MockHTTPAction extends HTTPAction {
    public getServerMethodName(): string {
        return 'someMethodName';
    }
}

describe('HTTPAction', () => {
    let httpAction: MockHTTPAction;

    beforeEach(() => {
        httpAction = new MockHTTPAction('some/path', 'someMethod');
    });

    it('should be created', () => {
        expect(httpAction).toBeTruthy();
    });
});
