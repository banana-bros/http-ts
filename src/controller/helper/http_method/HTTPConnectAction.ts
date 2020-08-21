import { HttpAction } from './HttpAction';

export class HttpConnectAction extends HttpAction {
    getMethodName(): string {
        return 'connect';
    }
}
