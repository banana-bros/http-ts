import { HTTPError } from './HTTPError';

export class HTTPInternalServerError extends HTTPError {
    constructor() {
        super(500, 'Internal Server Error');
    }
}
