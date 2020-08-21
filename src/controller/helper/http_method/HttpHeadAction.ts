import { HttpAction } from './HttpAction';

export class HttpHeadAction extends HttpAction {
    getMethodName(): string {
        return 'head';
    }
}
