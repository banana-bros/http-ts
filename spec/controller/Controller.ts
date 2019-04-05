import { expect } from 'chai';
import { Controller } from '../../src/controller/Controller';

class MockController extends Controller<void> {

}

describe('Controller', () => {
    let controller: MockController;

    beforeEach(() => {
        controller = new MockController();
    });

    it('should be created', () => {
        expect(controller).to.be.ok;
    });
});
