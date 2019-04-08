import { Authorizer } from './Authorizer';

export class NoAuthorizer extends Authorizer {
    public isAuthorized(): boolean {
        return true;
    }

    public authorize(): void {

    }

    public deauthorize(): void {

    }
}
