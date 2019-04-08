export abstract class Authorizer {
    public abstract isAuthorized(): boolean;
    public abstract authorize(): void;
    public abstract deauthorize(): void;
}
