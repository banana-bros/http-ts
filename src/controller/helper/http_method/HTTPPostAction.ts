import { HttpAction } from './HttpAction';

export class HttpPostAction extends HttpAction {
    getMethodName(): string {
        return 'post';
    }
}
