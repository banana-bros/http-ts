import { expect } from 'chai';
import { HttpInternalServerError } from '../../../src';

describe('HttpInternalServerError', () => {
    let httpInternalServerError: HttpInternalServerError;

    beforeEach(() => {
        httpInternalServerError = new HttpInternalServerError(null);
    });

    it('should be created', () => {
        expect(httpInternalServerError).to.be.ok;
    });
});
