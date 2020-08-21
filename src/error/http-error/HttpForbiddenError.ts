import { HttpError } from './HttpError';

export class HttpForbiddenError extends HttpError {
    constructor(message: string = null) {
        super(403, 'Forbidden', message);
    }
}
