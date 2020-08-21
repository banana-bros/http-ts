import { HttpAction } from './HttpAction';

export class HttpPatchAction extends HttpAction {
    getMethodName(): string {
        return 'patch';
    }
}
