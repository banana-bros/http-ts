import { HTTPPutAction } from '../../../../src/rest/controller/helper/HTTPPutAction';

describe('HTTPPutAction', () => {
    let httpPutAction: HTTPPutAction;

    beforeEach(() => {
        httpPutAction = new HTTPPutAction('some/path', 'someMethod', );
    });

    it('should be created', () => {
        expect(httpPutAction).toBeTruthy();
    });
});
