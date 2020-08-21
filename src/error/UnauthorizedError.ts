
export class UnauthorizedError extends Error {
    constructor(message: string = null) {
        super(message);
        this.name = 'UnauthorizedError';

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
