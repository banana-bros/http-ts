import { expect } from 'chai';
import { Repository } from '../../src';

describe('Repository', () => {
    let repository: Repository;

    beforeEach(() => {
        repository = new Repository();
    });

    it('should be created', () => {
        expect(repository).to.be.ok;
    });
});
