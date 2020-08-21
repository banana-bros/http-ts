import { Authenticator } from './Authenticator';
import { HttpServer } from 'src/http';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/controller';

export interface HttpRequestOptions {
    request: Request;
    response: Response;
}

export abstract class HttpAuthenticator extends Authenticator<HttpRequestOptions, HttpResponse> {
    public abstract isAuthenticated(options: HttpRequestOptions): boolean;
    public abstract authenticate(options: HttpRequestOptions): HttpResponse;
    public abstract unauthenticate(options: HttpRequestOptions): void;

    public registerServer(httpServer: HttpServer): void {
        const message = `${httpServer.constructor.name}: ${this.constructor.name}`;

        if (!this.path) {
            httpServer.getLogger().warn(`${message} could not be registered (no path)`);
            return;
        }

        httpServer.getExpress().post(this.path, (request: Request, response: Response) => {
            const httpResponse = this.authenticate({
                request,
                response
            });

            httpResponse.sendResponse({ request, response });
        });

        httpServer.getLogger().info(`${message} registered`);
    }
}
