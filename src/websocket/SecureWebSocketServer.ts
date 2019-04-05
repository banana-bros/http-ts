import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { Subject } from 'rxjs';
import { HTTPSServer } from '../HTTPSServer';
import { SecureServer } from '../SecureServer';

export class SecureWebSocketServer extends SecureServer<WebSocket.Server> {
    public onListening: Subject<null> = new Subject();

    private httpsServer: HTTPSServer;
    private wssServer: WebSocket.Server;

    protected createServer(): void {
        this.httpsServer = new HTTPSServer(this.port, this.certificate, this.key);

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
