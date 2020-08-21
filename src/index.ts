export * from './authenticator/index';
export * from './controller/index';
export * from './enum/index';
export * from './error/index';
export * from './http/index';
export * from './repository/index';
export * from './server/index';

import { Repository, SimpleRepository } from './repository';
import { HttpController, HttpGet, Authenticated } from './controller';
import { HttpServer } from './http';
import * as bcrypt from 'bcrypt';
import { JwtAuthenticator } from './authenticator';

async function main() {
    class Repo extends Repository {

    }

    class Controller extends HttpController<Repo> {
        @HttpGet('/test')
        @Authenticated()
        public getTest(): string {
            return 'gugus'
        }
    }

    const users: any[] = [{
        email: 'beni',
        password: await bcrypt.hash('beni', 10)
    }];


    const authRepository = new SimpleRepository(users);
    const jwtAuthenticator = new JwtAuthenticator<any>('/auth', {
        identificationKey: 'email',
        passwordKey: 'password',
        secret: 'some-secret',
        repository: authRepository,
        expiresIn: 86400
    });

    const server = new HttpServer(80, jwtAuthenticator);
    server.registerController(new Controller(new Repo()));

    server.error.subscribe(error => console.log(error));

    server.start();
}

main();