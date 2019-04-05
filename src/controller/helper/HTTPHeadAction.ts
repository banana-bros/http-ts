import { HTTPAction } from './HTTPAction';

export class HTTPHeadAction extends HTTPAction {
    getServerMethodName(): string {
        return 'head';
    }
}
