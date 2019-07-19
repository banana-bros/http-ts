import { HTTPAction } from './helper/http_method/HTTPAction';
import { Server } from '../Server';
import { Request, Response, RequestHandler } from 'express';
import { HTTPError } from 'src/error/http-error/HTTPError';
import { HTTPInternalServerError } from 'src/error/http-error/HTTPInternalServerError';
import { HTTPUnauthorizedError } from 'src/error/http-error/HTTPUnauthorizedError';
import { HTTPResponse } from './helper/HTTPResponse';

export abstract class Controller<T> {
    public actions: HTTPAction[];
    public authenticatedActions: Set<string>;

    protected repository: T;

    constructor(repository: T) {
        this.repository = repository;
        if (!this.actions) {
            this.actions = [];
        }
        if (!this.authenticatedActions) {
            this.authenticatedActions = new Set<string>();
        }
    }

    public registerActions(server: Server<any>) {
        for (const action of this.actions) {
            const serverMethod = action.getServerMethod(server);

            this.registerAction(action, server, serverMethod);
        }
    }

    protected registerAction(action: HTTPAction, server: Server<any>,
        serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void {

        if (this.authenticatedActions.has(action.method)) {
            this.addAuthenticatedServermethod(action, server, serverMethod);
        } else {
            this.addUnauthenticatedServermethod(action, server, serverMethod);
        }
    }

    private addAuthenticatedServermethod(action: HTTPAction, server: Server<any>,
        serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void {

        serverMethod(action.path, (request: Request, response: Response) =>
            this.handleAuthenticatedRequest(action, server, request, response)
        );
    }

    private addUnauthenticatedServermethod(action: HTTPAction, server: Server<any>,
        serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void {

        serverMethod(action.path, (request: Request, response: Response) =>
            this.handleUnauthenticatedRequest(action, server, request, response) );
    }

    private handleAuthenticatedRequest(action: HTTPAction, server: Server<any>, request: Request, response: Response): void {
        this.handleRequest(response, () => {
            if (server.isAuthenticated(request, response)) {
                return this[action.method](request, response);
            } else {
                throw new HTTPUnauthorizedError();
            }
        });
    }

    private handleUnauthenticatedRequest(action: HTTPAction, server: Server<any>, request: Request, response: Response): void {
        this.handleRequest(response, () => {
            return this[action.method](request, response);
        });
    }

    private handleRequest(response: Response, requestFn: () => any): void {
        let httpResponse: HTTPResponse;

        try {
            let res = requestFn();

            if (res instanceof HTTPResponse) {
                httpResponse = res;
            }
        } catch (error) {
            this.handleRequestError(error, httpResponse);
        } finally {
            if (httpResponse) {
                httpResponse.sendResponse(response);
            }
        }
    }

    private handleRequestError(error: Error, httpResponse: HTTPResponse): void {
        if (!(error instanceof HTTPError)) {
            const stack = error.stack;
            error = new HTTPInternalServerError();
            error.stack = stack;
        }

        console.error(error);

        httpResponse.code = (error as HTTPError).code;
        httpResponse.content = error.message;
    }
}
