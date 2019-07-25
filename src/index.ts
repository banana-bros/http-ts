

export * from './authenticator/index';
export * from './controller/index';
export * from './enum/index';
export * from './error/index';
export * from './http/index';
export * from './repository/index';
export * from './server/index';
export * from './websocket/index';
import * as jwt from 'jsonwebtoken';

/*
import { JWTAuthenticator } from './authenticator';
import { Repository } from './repository';
import { HTTPServer } from './http';
import { Controller, HTTPGet, Authenticated } from './controller';
interface User {
    email: string;
    password: string;
}

interface Data {
    foo: number;
    bar: string;
}

class TestRepository extends Repository<Data[]> {
    public getSecretData(): Data[] {
        return [{
            foo: 0,
            bar: 'top secret'
        }];
    }
}

class TestController extends Controller<TestRepository> {
    @HTTPGet('/test')
    public getTestDataUnauthorized() {
        return this.repository.getData();
    }

    @Authenticated()
    @HTTPGet('/test-authenticated')
    public getTestDataAuthenticated(): Data[] {
        return this.repository.getSecretData();
    }
}

const secret = 'some-secret';

const userRepository = new Repository<User[]>([{
    email: 'alkocats.info@gmail.com',
    password: jwt.sign('the-cake-is-a-lie', secret)
}]);

const authenticator = new JWTAuthenticator<User>('/auth', {
    identificationKey: 'email',
    passwordKey: 'password',
    repository: userRepository,
    secret: secret
});

const testRepository = new TestRepository([{
    foo: 1,
    bar: 'no secret data'
}]);
const testController = new TestController(testRepository);

const httpServer = new HTTPServer(80, authenticator);

httpServer.registerController(testController);
httpServer.start();
*/
