# http-ts

[![Build
Status](https://travis-ci.org/alkocats/http-ts.svg?branch=master)](https://travis-ci.org/alkocats/http-ts)
[![Maintainability](https://api.codeclimate.com/v1/badges/e37726ae1bb239134152/maintainability)](https://codeclimate.com/github/alkocats/http-ts/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e37726ae1bb239134152/test_coverage)](https://codeclimate.com/github/alkocats/http-ts/test_coverage)
[![npm version](https://badge.fury.io/js/%40alkocats%2Fhttp-ts.svg)](https://badge.fury.io/js/%40alkocats%2Fhttp-ts)
[![MIT License](https://img.shields.io/github/license/alkocats/http-ts.svg)](https://github.com/alkocats/http-ts/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/alkocats/http-ts/badge.svg)](https://snyk.io/test/github/alkocats/http-ts)
[![dependencies Status](https://david-dm.org/alkocats/http-ts/status.svg)](https://david-dm.org/alkocats/http-ts)
[![devDependencies Status](https://david-dm.org/alkocats/http-ts/dev-status.svg)](https://david-dm.org/alkocats/http-ts?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/alkocats/http-ts.svg)](https://greenkeeper.io/)

- [Installation](#installation)
- [Usage](#usage)
  - [Example](#example)
  - [Basic JWT / bcrypt Authentication](#basic-jwt--bcrypt-authentication)
- [API](#api)
  - [Supported HTTP methods](#supported-http-methods)
- [Contributing](#contributing)

## Installation

``` shell
npm install @alkocats/http-ts
```

## Usage

### Example

All relevant imports for a minimal setup:

``` typescript
import { Repository, Controller, HTTPGet, HTTPServer, HTTPForbiddenError, HTTP_STATUS } from '@alkocats/http-ts';
import { Request, Response } from 'express';
```

The user interface for the user repository:

``` typescript
interface User {
    name: string;
    password: string;
}
```

The user repository for the stored data the controller uses:

``` typescript
class UserRepository extends Repository<User[]> {
    public async getAsyncData(): Promise<User[]> {
        return this.data;
    }
}
```

The user controller, which handles the user requests, equipped with different GET-methods:

``` typescript
class UserController extends Controller<UserRepository> {
    /**
     * Define a GET-method for the url /users.
     */
    @HTTPGet('/users')
    public getUsers(): User[] {
        return this.repository.getData();
    }

    /**
     * Define a asynchronous GET-method for the url /async-users.
     */
    @HTTPGet('/async-users')
    public async getAsyncUsers(): Promise<User[]> {
        return await this.repository.getAsyncData();
    }

    /**
     * Define a asynchronous GET-method for the url /async-users-with-http-response and a custom http code
     */
    @HTTPGet ('/async-users-with-http-response')
    public async getAsyncUsersWithHTTPResponse(): Promise<HTTPResponse> {
        const data = await this.repository.getAsyncData();

        return new HTTPResponse(data, HTTP_STATUS.CODE_202_ACCEPTED);
    }

    /**
     * Define a GET-method for the url /faulty-users which throws a HTTP error.
     * None HTTP errors are automatically transformed to HTTP 500 error.
     */
    @HTTPGet('/faulty-method')
    public faultyMethod(): HTTPResponse {
        throw new HTTPForbiddenError();

        return null;
    }
}
```

Bringing it all together:

``` typescript
const userRepository = new UserRepository([{
    name: 'admin',
    password: 'the-cake-is-a-lie'
}]);
const userController = new UserController(userRepository);

const httpServer = new HTTPServer();
httpServer.registerController(userController);
httpServer.start();
```

### Basic JWT / bcrypt Authentication

All relevant imports for a minimal setup:

``` typescript
import * as bcrypt from 'bcrypt';
import { JWTAuthenticator, Repository, HTTPServer, Controller, HTTPGet, Authenticated } from './authenticator';
```

The user interface for the user repository:

``` typescript
interface User {
    email: string;
    password: string;
}
```

The data interface for the data repository:

``` typescript
interface Data {
    foo: number;
    bar: string;
}
```

The data repository for the stored data the controller uses:

``` typescript
class DataRepository extends Repository<Data[]> {
    public getSecretData(): Data[] {
        return [{
            foo: 0,
            bar: 'top secret'
        }];
    }
}

const dataRepository = new DataRepository([{
    foo: 1,
    bar: 'no secret data'
}]);
```

The data controller, which handles all data requests.

``` typescript
class DataController extends Controller<DataRepository> {
    /**
     * A unauthaenticated get method which can be called by everyone
     */
    @HTTPGet('/data')
    public getDataUnauthenticated() {
        return this.repository.getData();
    }

    /**
     * An authenticated get method, which can only be called by authenticated
     * users who deliver a valid bearer token.
     */
    @Authenticated()
    @HTTPGet('/data-authenticated')
    public getDataAuthenticated(): Data[] {
        return this.repository.getSecretData();
    }
}

const dataController = new DataController(dataRepository);
```

Bringing it all together:

``` typescript
async function main() {
    // To login with a valid password, the password needs to be hashed with bcrypt
    const hashedPassword = await bcrypt.hash('the-cake-is-a-lie', 10);

    // This repository is used by the JWTAuthenticator and contains all valid logins.
    const userRepository = new Repository<User[]>([{
        email: 'alkocats.info@gmail.com',
        password: hashedPassword
    }]);

    // The secret for JWTAuthenticator to use for encryption / decryption.
    const secret = 'some-secret';

    /**
     * The path '/auth' defines, where to make a post with email / password
     * as a json object to obtain a valid bearer token.
     * The token then can be used to access @Authenticated methods of the
     * registered controllers.
     */
    const authenticator = new JWTAuthenticator<User>('/auth', {
        // Defines the repository with all the valid logins
        repository: userRepository,
        // Defines, which field of the repository data is used for identification
        identificationKey: 'email',
        // Defines, in which field of the repository data the hashed password is stored
        passwordKey: 'password',
        // Defines the expiration time of generated tokens (still valid after restart of server)
        expiresIn: 86400,
        // Defines the secret JWT uses to encrypt / decrypt the generated tokens.
        secret: secret
    });

    const httpServer = new HTTPServer(80, authenticator);

    httpServer.registerController(dataController);
    httpServer.start();
}

main();
```

After everything is implemented, a post to http://localhost/auth with the json data

``` json
{
    "email": "alkocats.info@gmail.com",
    "password": "the-cake-is-a-lie"
}
```

generates a bearer token, wich can be used in future requests to access @Authenticated methods of the registered controllers.

Alternatively a custom Authenticater can be created by creating a class which extends Authenticator.

## API

### Supported HTTP methods

`@HTTPGet(path: string)`

`@HTTPPut(path: string)`

`@HTTPPost(path: string)`

`@HTTPDelete(path: string)`

`@HTTPPatch(path: string)`

`@HTTPHead(path: string)`

`@HTTPOptions(path: string)`

`@HTTPTrace(path: string)`

`@HTTPConnect(path: string)`

## Contributing

Feel free to create branches or pull requests.
