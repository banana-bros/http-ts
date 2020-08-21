export abstract class HttpError extends Error {
    public code: number;

    constructor(code: number, name: string, message: string) {
        super(message);
        this.code = code;
        this.name = name;

        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
