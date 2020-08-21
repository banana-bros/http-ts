import { HttpAction } from './helper/http_method/HttpAction';
import { Request, Response } from 'express';
import { HttpError } from '../error/http-error/HttpError';
import { HttpInternalServerError } from '../error/http-error/HttpInternalServerError';
import { HttpResponse } from './helper/HttpResponse';
import { HttpServer } from '../http';
import { Controller } from './Controller';
import { UnauthorizedError } from '../error/UnauthorizedError';
import { Repository } from '../repository';
import { HttpRequestOptions } from '../authenticator';
import { HttpUnauthorizedError } from '../error';

export abstract class HttpController<R extends Repository> extends Controller<R, HttpServer, HttpAction, HttpRequestOptions> {
    protected assignActionHandler(action: HttpAction, server: HttpServer, handler: (options: HttpRequestOptions) => void): void {
        action.getServerMethod(server)(action.path, (request: Request, response: Response) => handler({ request, response }));
    }

    protected async getResponse(result: any): Promise<HttpResponse> {
        let response: HttpResponse;

        if (result instanceof Promise) {
            result = await result;
        }

        if (result instanceof HttpResponse) {
            response = result;
        } else {
            response = new HttpResponse(result);
        }

        return response;
    }

    protected handleRequestError(httpServer: HttpServer, error: Error, options: HttpRequestOptions): HttpResponse {
        if (error instanceof UnauthorizedError) {
            error = new HttpUnauthorizedError();
        }

        if (error instanceof HttpError) {
            httpServer.getLogger().error(error.name);
        } else {
            httpServer.getLogger().error(error.stack);
            const stack = error.stack;
            error = new HttpInternalServerError();
            error.stack = stack;
        }

        return new HttpResponse(null, (error as HttpError).code);
    }
}
