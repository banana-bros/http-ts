import { expect } from 'chai';
import { Controller, HttpResponse } from '../../src';

class MockController extends Controller<any, any, any, any> {
    protected async assingActionHandler(action: any, server: any, handler: (options: any) => void): Promise<void> {
        return null;
    }

    protected async getResponse(result: any): Promise<any> { }

    public registerActions(server: any): void {}
    
    protected registerAction(action: any, server: any): void {}

    protected handleAuthenticatedRequest(action: any, server: any, options: any): void {}

    protected handleUnauthenticatedRequest(action: any, server: any, options: any): void {}

    protected async handleRequest(server: any, options: any, requestFn: () => any): Promise<void> {
        return null;
    }

    protected handleRequestError(server: any, error: Error, options: any): HttpResponse {
        return null;
    }
}

describe('Controller', () => {
    let controller: MockController;

    beforeEach(() => {
        controller = new MockController(null);
    });

    it('should be created', () => {
        expect(controller).to.be.ok;
    });
});
