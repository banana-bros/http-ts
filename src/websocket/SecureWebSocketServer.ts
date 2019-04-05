import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { Subject } from 'rxjs';
import { Server } from '../Server';
import { HTTPSServer } from '../HTTPSServer';

export interface ConnectionEvent {
    connection: WebSocket;
    request: IncomingMessage;
}

export class WebSocketServer extends Server<WebSocket.Server> {
    public onListening: Subject<null> = new Subject();

    private certificate: string | Buffer | (string | Buffer)[];
    private key: string | Buffer | (string | Buffer)[];
    private httpsServer: HTTPSServer;
    private wssServer: WebSocket.Server;

    constructor(port: number, certificate: string | Buffer | (string | Buffer)[], key: string | Buffer | (string | Buffer)[]) {
        super(port);
        this.certificate = certificate;
        this.key = key;

        this.httpsServer = new HTTPSServer(this.port, this.certificate, this.key);
    }

    protected createServer(): void {

        this.wssServer = new WebSocket.Server({
            server: this.httpsServer.getServer()
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
        this.httpsServer.start();
    }

    public stop(): void {
        this.httpsServer.stop();
    }
}
