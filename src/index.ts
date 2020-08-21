import { HttpServer } from './http';
import { Request, Response } from 'express';

export * from './authenticator/index';
export * from './controller/index';
export * from './enum/index';
export * from './error/index';
export * from './http/index';
export * from './repository/index';
export * from './server/index';
            
const headers = new Map<string, string>();

headers.set('Access-Control-Allow-Origin', '*')
.set('Access-Control-Allow-Credentials', 'true')
.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
.set('Access-Control-Expose-Headers', 'Content-Length')
.set('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

const httpServer = new HttpServer();

httpServer.setPermanentHeaders(headers);

httpServer.getExpress().get('/test', (request: Request, response: Response) => {
    response.send('hy');
});

httpServer.start();
