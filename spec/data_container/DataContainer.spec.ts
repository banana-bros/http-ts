import { DataContainer } from '../../src/data_container/DataContainer';

class Mock {
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}

describe('Data Container', () => {
    let dataContainer: DataContainer<Mock[]>;

    beforeEach(() => {
    });

    it('should be created', () => {
        dataContainer = new DataContainer([]);
        expect(dataContainer).toBeTruthy();
    });

    it('should return all the data', () => {
        dataContainer = new DataContainer([]);
        expect(dataContainer.getData()).toEqual([]);
    });

    it('should return all the data', () => {
        const data = [
            new Mock(1)
        ];
        dataContainer = new DataContainer(data);
        expect(dataContainer.getData()).toEqual(data);
    });
});
