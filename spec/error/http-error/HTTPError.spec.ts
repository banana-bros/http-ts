import { expect } from 'chai';
import { HttpError } from '../../../src';

class MockHttpError extends HttpError {

}

describe('HttpError', () => {
    let httpError: MockHttpError;

    beforeEach(() => {
        httpError = new MockHttpError(null, null, null);
    });

    it('should be created', () => {
        expect(httpError).to.be.ok;
    });
});
