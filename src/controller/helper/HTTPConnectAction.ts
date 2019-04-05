import { HTTPAction } from './HTTPAction';

export class HTTPConnectAction extends HTTPAction {
    getServerMethodName(): string {
        return 'connect';
    }
}
