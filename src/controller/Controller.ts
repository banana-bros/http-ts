import { HTTPAction } from './helper/HTTPAction';
import { Server } from '../Server';
import { Request, Response } from 'express';

export abstract class Controller<T> {
    public actions: HTTPAction[];

    protected dataContainer: T;

    constructor(dataContainer: T) {
        this.dataContainer = dataContainer;
        if (!this.actions) {
            this.actions = [];
        }
    }

    public registerActions(server: Server<any>) {
        for (const action of this.actions) {
            const serverMethod = action.getServerMethod(server);
            serverMethod(action.path, (request: Request, response: Response) => this[action.method](request, response) );
        }
    }
}
