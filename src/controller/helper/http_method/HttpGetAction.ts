import { HttpAction } from './HttpAction';

export class HttpGetAction extends HttpAction {
    getMethodName(): string {
        return 'get';
    }
}
