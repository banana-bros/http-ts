import { HTTPTraceAction } from '../../../../src/rest/controller/helper/HTTPTraceAction';

describe('HTTPTraceAction', () => {
    let httpTraceAction: HTTPTraceAction;

    beforeEach(() => {
        httpTraceAction = new HTTPTraceAction('some/path', 'someMethod', );
    });

    it('should be created', () => {
        expect(httpTraceAction).toBeTruthy();
    });
});
