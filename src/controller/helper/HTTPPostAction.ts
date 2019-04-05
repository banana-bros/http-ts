import { HTTPAction } from './HTTPAction';

export class HTTPPostAction extends HTTPAction {
    getServerMethodName(): string {
        return 'post';
    }
}
