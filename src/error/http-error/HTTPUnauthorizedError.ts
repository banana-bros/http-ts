import { HTTPError } from './HTTPError';

export class HTTPUnauthorizedError extends HTTPError {
    constructor() {
        super(401, 'Unauthorized');
    }
}
