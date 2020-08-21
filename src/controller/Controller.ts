import { Server } from '../server/Server';
import { Request, Response, RequestHandler } from 'express';
import { HttpResponse } from './helper/HttpResponse';
import { Action } from 'src/controller/helper/Action';
import { Repository } from 'src/repository';

export abstract class Controller<R extends Repository, T extends Server<any>, A extends Action> {
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

    public abstract registerActions(server: T): void;
    protected abstract registerAction(action: A, server: T, serverMethod: (path: string, ...handlers: RequestHandler[]) => void): void;
    protected abstract handleAuthenticatedRequest(action: A, server: T, request: Request, response: Response): void;
    protected abstract handleUnauthenticatedRequest(action: A, server: T, request: Request, response: Response): void;
    protected abstract async handleRequest(server: T, response: Response, requestFn: () => any): Promise<void>;
    protected abstract handleRequestError(server: T, error: Error): HttpResponse;
}
