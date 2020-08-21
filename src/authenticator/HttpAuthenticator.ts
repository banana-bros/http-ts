import { Authenticator } from './Authenticator';
import { HttpServer } from 'src/http';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/controller';

export interface HttpAuthenticationOptions {
    request: Request;
    response: Response;
}

export abstract class HttpAuthenticator extends Authenticator<HttpAuthenticationOptions, HttpResponse> {
    public abstract isAuthenticated(options: HttpAuthenticationOptions): boolean;
    public abstract authenticate(options: HttpAuthenticationOptions): HttpResponse;
    public abstract unauthenticate(options: HttpAuthenticationOptions): void;

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

            httpResponse.sendResponse(response);
        });

        httpServer.getLogger().info(`${message} registered`);
    }
}