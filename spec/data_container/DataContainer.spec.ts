import { expect } from 'chai';
import { DataContainer } from '../../src';

describe('DataContainer', () => {
    let dataContainer: DataContainer<void>;

    beforeEach(() => {
        dataContainer = new DataContainer(null);
    });

    it('should be created', () => {
        expect(dataContainer).to.be.ok;
    });
});
