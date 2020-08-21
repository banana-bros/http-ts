import { expect } from 'chai';
import { HttpResponse } from '../../../src';

describe('HttpResponse', () => {
    let httpResponse: HttpResponse;

    beforeEach(() => {
        httpResponse = new HttpResponse(null, null);
    });

    it('should be created', () => {
        expect(httpResponse).to.be.ok;
    });
});
