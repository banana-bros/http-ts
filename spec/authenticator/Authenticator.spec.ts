import { expect } from 'chai';
import { Authenticator, Server } from '../../src';

class MockAuthenticator extends Authenticator<null, null> {
    public isAuthenticated(): boolean {
        return true;
    }

    public authenticate(): null {
        return;
    }

    public unauthenticate(): void {

    }

    public registerServer(server: Server<any>): void {}
}

describe('Authenticator', () => {
    let authenticator: Authenticator<any, any>;

    beforeEach(() => {
        authenticator = new MockAuthenticator();
    });

    it('should be created', () => {
        expect(authenticator).to.be.ok;
    });
});
