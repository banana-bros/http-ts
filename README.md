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

- [Installation](#Installation)
- [Usage](#Usage)
  - [Example](#Example)
- [API](#API)
  - [Supported HTTP methods](#Supported-HTTP-methods)
- [Contributing](#Contributing)
- [Credits](#Credits)
- [License](#License)

## Installation

``` shell
npm install @alkocats/http-ts
```

## Usage

### Example

All relevant imports for a minimal setup:

``` typescript
import { Repository, Controller, HTTPGet, HTTPServer, HTTPForbiddenError } from '@alkocats/http-ts';
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

The user controller which handles the user requests equipped with one GET-method:

``` typescript
class UserController extends Controller<UserRepository> {
    /**
     * Define a GET-method for the url /users.
     */
    @HTTPGet('/users')
    public getUsers(): HTTPResponse {
        return new HTTPResponse(this.repository.getData());
    }

    /**
     * Define a asynchronous GET-method for the url /async-users.
     */
    @HTTPGet('/async-users')
    public async getAsyncUsers(): Promise<HTTPResponse> {
        return new HTTPResponse(await this.repository.getAsyncData());
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

## Credits

## License
