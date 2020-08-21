import { Authenticator } from './Authenticator';
import { Server } from '../server/Server';

export class NoAuthenticator extends Authenticator<null, null> {
    public isAuthenticated(): boolean {
        return true;
    }

    public authenticate(): null {
        return;
    }

    public unauthenticate(): void {

    }

    public registerServer(server: Server<any>): void {
        server.getLogger().info(`${server.constructor.name}: ${this.constructor.name} skipped registration`);
    }
}
