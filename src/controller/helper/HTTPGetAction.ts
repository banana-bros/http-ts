import { HTTPAction } from './HTTPAction';

export class HTTPGetAction extends HTTPAction {
    getServerMethodName(): string {
        return 'get';
    }
}
