import { HTTPGetAction } from '../../../../src/rest/controller/helper/HTTPGetAction';

describe('HTTPGetAction', () => {
    let httpGetAction: HTTPGetAction;

    beforeEach(() => {
        httpGetAction = new HTTPGetAction('some/path', 'someMethod');
    });

    it('should be created', () => {
        expect(httpGetAction).toBeTruthy();
    });
});
