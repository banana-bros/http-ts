import { expect } from 'chai';
import { AuthenticatedAction } from '../../../../src';

describe('HttpAction', () => {
    let authenticatedAction: AuthenticatedAction;

    beforeEach(() => {
        authenticatedAction = new AuthenticatedAction(null);
    });

    it('should be created', () => {
        expect(authenticatedAction).to.be.ok;
    });
});
