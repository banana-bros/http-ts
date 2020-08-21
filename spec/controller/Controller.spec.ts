import { expect } from 'chai';
import { Controller, HttpResponse } from '../../src';
import { RequestHandler, Request, Response } from 'express';

class MockController extends Controller<any, any> {
    public registerActions(server: any): void {}
    
    protected registerAction(action: any, server: any, serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void {}

    protected handleAuthenticatedRequest(action: any, server: any, request: Request, response: Response): void {}

    protected handleUnauthenticatedRequest(action: any, server: any, request: Request, response: Response): void {}

    protected async handleRequest(server: any, response: Response, requestFn: () => any): Promise<void> {
        return null;
    }

    protected handleRequestError(server: any, error: Error): HttpResponse {
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
