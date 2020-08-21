import { HttpAction } from './HttpAction';

export class HttpTraceAction extends HttpAction {
    getMethodName(): string {
        return 'trace';
    }
}
