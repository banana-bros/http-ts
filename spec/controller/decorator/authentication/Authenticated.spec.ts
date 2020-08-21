import { expect } from 'chai';
import { Authenticated } from '../../../../src';

class MockAuthenticated {
    @Authenticated()
    public test() {

    }
}

describe('HttpConnect', () => {
    let authenticated: MockAuthenticated;

    beforeEach(() => {
        authenticated = new MockAuthenticated();
    });

    it('should be created', () => {
        expect(authenticated).to.be.ok;
    });
});
