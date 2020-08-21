import { HttpError } from './HttpError';

export class HttpUnauthorizedError extends HttpError {
    constructor() {
        super(401, 'Unauthorized', null);
    }
}
