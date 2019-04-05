import { HTTPDeleteAction } from '../../../../src/rest/controller/helper/HTTPDeleteAction';

describe('HTTPDeleteAction', () => {
    let httpDeleteAction: HTTPDeleteAction;

    beforeEach(() => {
        httpDeleteAction = new HTTPDeleteAction('some/path', 'someMethod');
    });

    it('should be created', () => {
        expect(httpDeleteAction).toBeTruthy();
    });
});
