import { HTTPOptionsAction } from '../../../../src/rest/controller/helper/HTTPOptionsAction';

describe('HTTPOptionsAction', () => {
    let httpOptionsAction: HTTPOptionsAction;

    beforeEach(() => {
        httpOptionsAction = new HTTPOptionsAction('some/path', 'someMethod', );
    });

    it('should be created', () => {
        expect(httpOptionsAction).toBeTruthy();
    });
});
