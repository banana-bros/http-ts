import { HTTPAction } from './helper/http_method/HTTPAction';
import { Server } from '../Server';
import { Request, Response } from 'express';

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
            if (this.authenticatedActions.has(action.method)) {
                serverMethod(action.path, (request: Request, response: Response) => {
                    if (server.isAuthenticated(request, response)) {
                        return this[action.method](request, response);
                    }
                });
            } else {
                serverMethod(action.path, (request: Request, response: Response) => this[action.method](request, response) );
            }
        }
    }
}
