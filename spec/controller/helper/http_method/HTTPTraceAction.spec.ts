import { expect } from 'chai';
import { HttpTraceAction } from '../../../../src';

describe('HttpTraceAction', () => {
    let httpTraceAction: HttpTraceAction;

    beforeEach(() => {
        httpTraceAction = new HttpTraceAction(null, null);
    });

    it('should be created', () => {
        expect(httpTraceAction).to.be.ok;
    });
});
