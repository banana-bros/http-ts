import { expect } from 'chai';
import { HttpUnauthorizedError } from '../../../src';

describe('HttpUnauthorizedError', () => {
    let httpUnauthorizedError: HttpUnauthorizedError;

    beforeEach(() => {
        httpUnauthorizedError = new HttpUnauthorizedError();
    });

    it('should be created', () => {
        expect(httpUnauthorizedError).to.be.ok;
    });
});
