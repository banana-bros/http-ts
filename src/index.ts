export * from './Server';
export * from './SecureServer';
export * from './HTTPServer';
export * from './HTTPSServer';
export * from './websocket/index';
export * from './enum/index';
export * from './data_container/index';
export * from './controller/index';

import { Request, Response } from 'express';
import { DataContainer } from './data_container';
import { Controller, HTTPGet } from './controller';
import { HTTPServer } from './HTTPServer';

interface User {
    name: string;
    password: string;
}

class UserContainer extends DataContainer<User[]> {

    constructor() {
        super([{
            name: 'adam',
            password: 'password1'
        }]);
    }
}

class UserController extends Controller<UserContainer> {

    @HTTPGet('/users')
    public getUsers(request: Request, response: Response): void {
        console.log('Request: %s %s ', request.method, request.url);
        response.json(this.dataContainer.getData());
    }
}

const httpServer = new HTTPServer(80);
const userController = new UserController(new UserContainer());
httpServer.registerController(userController);
httpServer.start();
