import { HttpAction } from './helper/http_method/HttpAction';
import { Request, Response, RequestHandler } from 'express';
import { HttpError } from '../error/http-error/HttpError';
import { HttpInternalServerError } from '../error/http-error/HttpInternalServerError';
import { HttpUnauthorizedError } from '../error/http-error/HttpUnauthorizedError';
import { HttpResponse } from './helper/HttpResponse';
import { HttpServer } from 'src/http';

export abstract class HttpController<T> {
    public actions: HttpAction[];
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

    public registerActions(httpServer: HttpServer) {
        for (const action of this.actions) {
            const serverMethod = action.getServerMethod(httpServer);

            this.registerAction(action, httpServer, serverMethod);
        }
    }

    protected registerAction(action: HttpAction, httpServer: HttpServer,
        serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void {
        let method: (request: Request, response: Response) => void;

        if (this.authenticatedActions.has(action.method)) {
            method = (request: Request, response: Response) => {
                this.handleAuthenticatedRequest(action, httpServer, request, response);
            };
        } else {
            method = (request: Request, response: Response) => {
                this.handleUnauthenticatedRequest(action, httpServer, request, response);
            };
        }

        serverMethod(action.path, method);
    }

    private handleAuthenticatedRequest(action: HttpAction, httpServer: HttpServer, request: Request, response: Response): void {
        this.handleRequest(httpServer, response, () => {
            if (httpServer.isAuthenticated({
                request,
                response
            })) {
                return this[action.method](request, response);
            } else {
                throw new HttpUnauthorizedError();
            }
        });
    }

    private handleUnauthenticatedRequest(action: HttpAction, httpServer: HttpServer, request: Request, response: Response): void {
        this.handleRequest(httpServer, response, () => {
            return this[action.method](request, response);
        });
    }

    private async handleRequest(httpServer: HttpServer, response: Response, requestFn: () => any): Promise<void> {
        let httpResponse: HttpResponse;

        try {
            let res = requestFn();

            if (res instanceof Promise) {
                res = await res;
            }

            if (res instanceof HttpResponse) {
                httpResponse = res;
            } else {
                httpResponse = new HttpResponse(res);
            }
        } catch (error) {
            httpResponse = this.handleRequestError(httpServer, error);
        } finally {
            if (httpResponse) {
                httpResponse.sendResponse(response);
            }
        }
    }

    private handleRequestError(httpServer: HttpServer, error: Error): HttpResponse {
        httpServer.getLogger().error(error.name);

        if (!(error instanceof HttpError)) {
            httpServer.getLogger().error(error.stack);
            const stack = error.stack;
            error = new HttpInternalServerError();
            error.stack = stack;
        }

        return new HttpResponse(null, (error as HttpError).code);
    }
}
