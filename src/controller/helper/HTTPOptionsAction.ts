import { HTTPAction } from './HTTPAction';


export class HTTPOptionsAction extends HTTPAction {
    getServerMethodName(): string {
        return 'options';
    }
}
