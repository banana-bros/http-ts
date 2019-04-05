import { HTTPAction } from './HTTPAction';

export class HTTPPutAction extends HTTPAction {
    getServerMethodName(): string {
        return 'put';
    }
}
