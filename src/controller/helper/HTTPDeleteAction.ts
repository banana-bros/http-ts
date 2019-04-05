import { HTTPAction } from './HTTPAction';

export class HTTPDeleteAction extends HTTPAction {
    getServerMethodName(): string {
        return 'delete';
    }
}
