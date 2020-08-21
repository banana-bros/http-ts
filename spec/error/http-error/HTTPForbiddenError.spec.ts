import { expect } from 'chai';
import { HttpForbiddenError } from '../../../src';

describe('HttpForbiddenError', () => {
    let httpForbiddenError: HttpForbiddenError;

    beforeEach(() => {
        httpForbiddenError = new HttpForbiddenError(null);
    });

    it('should be created', () => {
        expect(httpForbiddenError).to.be.ok;
    });
});
