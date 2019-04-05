import { Controller } from '../../../src/rest/controller/Controller';
import { DataContainer } from '../../../src/data_container/DataContainer';

class MockController extends Controller<any> {
    public getServerMethodName(): string {
        return 'someMethodName';
    }
}

describe('Controller', () => {
    let controller: MockController;

    beforeEach(() => {
        controller = new MockController(new DataContainer<any>([]));
    });

    it('should be created', () => {
        expect(controller).toBeTruthy();
    });
});
