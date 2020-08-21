import { HttpError } from './HttpError';

export class HttpUnauthorizedError extends HttpError {
    constructor(message: string = null) {
        super(401, 'Unauthorized', message);
    }
}
