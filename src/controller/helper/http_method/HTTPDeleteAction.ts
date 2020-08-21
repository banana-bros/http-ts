import { HttpAction } from './HttpAction';

export class HttpDeleteAction extends HttpAction {
    getMethodName(): string {
        return 'delete';
    }
}
