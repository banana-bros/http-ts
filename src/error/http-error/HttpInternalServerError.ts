import { HttpError } from './HttpError';

export class HttpInternalServerError extends HttpError {
    constructor(message: string = null) {
        super(500, 'Internal Server Error', message);
    }
}
