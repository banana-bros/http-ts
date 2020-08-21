import { Server } from '../server/Server';
import { HttpResponse } from './helper/HttpResponse';
import { Action } from 'src/controller/helper/Action';
import { Repository } from 'src/repository';
import { ServerResponse } from './helper/ServerResponse';
import { UnauthorizedError } from '../error/UnauthorizedError';

export abstract class Controller<R extends Repository, S extends Server<any>, A extends Action, O> {
    public actions: A[];
    public authenticatedActions: Set<string>;

    protected repository: R;

    constructor(repository: R) {
        this.repository = repository;
        if (!this.actions) {
            this.actions = [];
        }
        if (!this.authenticatedActions) {
            this.authenticatedActions = new Set<string>();
        }
    }

    protected abstract assignActionHandler(action: A, server: S, handler: (options: O) => void): void;
    protected abstract async getResponse(result: any): Promise<ServerResponse<any>>;
    protected abstract handleRequestError(server: S, error: Error, options: O): HttpResponse;

    public registerActions(server: S) {
        for (const action of this.actions) {
            this.getActionHandler(action, server);
        }
    }

    protected getActionHandler(action: A, server: S): void {
        let actionHandler: (options: O) => void;

        if (this.authenticatedActions.has(action.method)) {
            actionHandler = (options: O) => {
                this.handleAuthenticatedRequest(action, server, options);
            };
        } else {
            actionHandler = (options: O) => {
                this.handleUnauthenticatedRequest(action, server, options);
            };
        }

        this.assignActionHandler(action, server, actionHandler);
    }

    protected handleAuthenticatedRequest(action: A, server: S, options: O): void {
        this.handleRequest(server, options, () => {
            if (server.isAuthenticated(options)) {
                return this[action.method](options);
            } else {
                throw new UnauthorizedError('');
            }
        });
    }

    protected handleUnauthenticatedRequest(action: A, server: S, options: O): void {
        this.handleRequest(server, options, () => {
            return this[action.method](options);
        });
    }

    protected async handleRequest(server: S, options: O, requestFn: () => any): Promise<void> {
        let response: ServerResponse<any>;

        try {
            const result = requestFn();
            response = await this.getResponse(result);
        } catch (error) {
            response = this.handleRequestError(server, error, options);
        } finally {
            if (response) {
                response.sendResponse(options);
            }
        }
    }
}
