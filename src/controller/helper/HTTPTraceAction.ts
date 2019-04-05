import { HTTPAction } from './HTTPAction';

export class HTTPTraceAction extends HTTPAction {
    getServerMethodName(): string {
        return 'trace';
    }
}
