import { HTTPHeadAction } from '../../../../src/rest/controller/helper/HTTPHeadAction';

describe('HTTPHeadAction', () => {
    let httpHeadAction: HTTPHeadAction;

    beforeEach(() => {
        httpHeadAction = new HTTPHeadAction('some/path', 'someMethod');
    });

    it('should be created', () => {
        expect(httpHeadAction).toBeTruthy();
    });
});
