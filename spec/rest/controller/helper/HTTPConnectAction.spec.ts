import { HTTPConnectAction } from '../../../../src/rest/controller/helper/HTTPConnectAction';

describe('HTTPConnectAction', () => {
    let httpConnectAction: HTTPConnectAction;

    beforeEach(() => {
        httpConnectAction = new HTTPConnectAction('some/path', 'someMethod');
    });

    it('should be created', () => {
        expect(httpConnectAction).toBeTruthy();
    });
});
