# http-ts

[![Build Status](https://travis-ci.org/Rothen/http-ts.svg?branch=master)](https://travis-ci.org/Rothen/http-ts)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b112a2ee0b340b63215/test_coverage)](https://codeclimate.com/github/Rothen/http-ts/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b112a2ee0b340b63215/maintainability)](https://codeclimate.com/github/Rothen/http-ts/maintainability)
[![npm version](https://badge.fury.io/js/%40alkocats%2Fex-math.svg)](https://badge.fury.io/js/%40alkocats%2Fex-math)
[![MIT License](https://img.shields.io/github/license/Rothen/http-ts.svg)](https://github.com/Rothen/http-ts/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/Rothen/http-ts/badge.svg)](https://snyk.io/test/github/Rothen/http-ts)
[![dependencies Status](https://david-dm.org/Rothen/http-ts/status.svg)](https://david-dm.org/Rothen/http-ts)
[![devDependencies Status](https://david-dm.org/Rothen/http-ts/dev-status.svg)](https://david-dm.org/Rothen/http-ts?type=dev)

- [Installation](#installation)
- [Usage](#usage)
  - [Example](#example)
- [API](#api)
  - [Supported HTML methods](#supported-html-methods)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Installation

``` shell
npm install --save http-ts
```

## Usage

### Example

All relevant imports for a minimal setup:

``` typescript
import { HTTPSServer, Controller, DataContainer, HTTPGet } from 'http-ts';
import { Request, Response } from 'express-serve-static-core';
```

The user interface for the data container:

``` typescript
interface User {
    name: string,
    password: string
}
```

The user container for the stored data the controller uses:

``` typescript
class UserContainer extends DataContainer<User[]> {

    constructor() {
        super([{
            name: 'adam',
            password: 'password1'
        }])
    }
}
```

The user controller which handles the user requests equipped with one GET-method:

``` typescript
class UserController extends Controller<UserContainer> {

    @HTTPGet('/users')
    public getUsers(request: Request, response: Response): void {
        console.log('Status.GET | %s | %s ', request.method, request.url);
        response.json(this.dataContainer.getData());
    }
}
```

Bringin all together:

``` typescript
const httpServer = new HTTPServer(80);
const userController = new UserController();
httpServer.registerController(userController);
httpServer.start();
```

## API

### Supported HTML methods

`@HTTPGet(path: string)`:

`@HTTPPut(path: string)`:

`@HTTPPost(path: string)`:

`@HTTPDelete(path: string)`:

`@HTTPHead(path: string)`:

`@HTTPOptions(path: string)`:

`@HTTPTrace(path: string)`:

`@HTTPConnect(path: string)`:

## Contributing

## Credits

## License