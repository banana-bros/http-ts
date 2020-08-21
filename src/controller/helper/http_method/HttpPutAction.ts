import { HttpAction } from './HttpAction';

export class HttpPutAction extends HttpAction {
    getMethodName(): string {
        return 'put';
    }
}
