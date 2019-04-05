import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { Subject } from 'rxjs';
import { Server } from '../Server';
import { Http2SecureServer } from 'http2';
import { HTTPServer } from '../HTTPServer';
import { HTTPSServer } from '../HTTPSServer';

export interface ConnectionEvent {
    connection: WebSocket;
    request: IncomingMessage;
}

export class WebSocketServer extends Server<WebSocket.Server> {
    public onListening: Subject<null> = new Subject();

    private httpServer: HTTPServer;
    private wssServer: WebSocket.Server;

    constructor(port: number) {
        super(port);

        this.httpServer = new HTTPServer(this.port);
    }

    protected createServer(): void {

        this.wssServer = new WebSocket.Server({
            server: this.httpServer.getServer()
        });

        this.wssServer.on('listening', () => this.onListening.next());

        this.wssServer.on('connection', (connection: WebSocket, request: IncomingMessage) => {
            this.onConnection.next({
                connection: connection,
                request: request
            } as any);
        });
    }

    public start(): void {
        this.httpServer.start();
    }

    public stop(): void {
        this.httpServer.stop();
    }
}
