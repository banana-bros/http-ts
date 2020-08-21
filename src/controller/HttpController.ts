import { HttpAction } from './helper/http_method/HttpAction';
import { Request, Response, RequestHandler } from 'express';
import { HttpError } from '../error/http-error/HttpError';
import { HttpInternalServerError } from '../error/http-error/HttpInternalServerError';
import { HttpUnauthorizedError } from '../error/http-error/HttpUnauthorizedError';
import { HttpResponse } from './helper/HttpResponse';
import { HttpServer } from 'src/http';
import { Controller } from './Controller';
import { Repository } from 'src/repository';

export abstract class HttpController<R extends Repository> extends Controller<R, HttpServer, HttpAction> {
    public actions: HttpAction[];
    public authenticatedActions: Set<string>;

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

    protected handleAuthenticatedRequest(action: HttpAction, httpServer: HttpServer, request: Request, response: Response): void {
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

    protected handleUnauthenticatedRequest(action: HttpAction, httpServer: HttpServer, request: Request, response: Response): void {
        this.handleRequest(httpServer, response, () => {
            return this[action.method](request, response);
        });
    }

    protected async handleRequest(httpServer: HttpServer, response: Response, requestFn: () => any): Promise<void> {
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

    protected handleRequestError(httpServer: HttpServer, error: Error): HttpResponse {
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
