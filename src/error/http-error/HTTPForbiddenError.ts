import { HTTPError } from './HTTPError';

export class HTTPForbiddenError extends HTTPError {
    constructor() {
        super(403, 'Forbidden');
    }
}
