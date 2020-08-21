import { expect } from 'chai';
import { JwtAuthenticator, SimpleRepository } from '../../src';

interface User {
    id?: number;
    password?: string;
}

describe('JwtAuthenticator', () => {
    let jwtAuthenticator: JwtAuthenticator<User>;

    beforeEach(() => {
        jwtAuthenticator = new JwtAuthenticator('/authenticate', {
            identificationKey: 'id',
            passwordKey: 'password',
            repository: new SimpleRepository<User[]>([]),
            secret: 'some-secret',
            expiresIn: 86400
        });
    });

    it('should be created', () => {
        expect(jwtAuthenticator).to.be.ok;
    });
});
