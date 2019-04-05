import { HTTPPostAction } from '../../../../src/rest/controller/helper/HTTPPostAction';

describe('HTTPPostAction', () => {
    let httpPostAction: HTTPPostAction;

    beforeEach(() => {
        httpPostAction = new HTTPPostAction('some/path', 'someMethod', );
    });

    it('should be created', () => {
        expect(httpPostAction).toBeTruthy();
    });
});
