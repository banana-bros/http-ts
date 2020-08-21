import { Response, Request } from 'express';
import { HttpResponse } from '../controller/helper/HttpResponse';
import { Server } from 'src/server';

export abstract class Authenticator<O, A> {
    protected path: string;

    constructor(path: string = '') {
        this.path = path;
    }

    public abstract registerServer(server: Server<any>): void;
    public abstract isAuthenticated(options: O): boolean;
    public abstract authenticate(options: O): A;
    public abstract unauthenticate(options: O): void;

}
