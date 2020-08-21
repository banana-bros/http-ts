import { HttpTraceAction } from '../../helper/http_method/HttpTraceAction';
import { assign } from './assign';

export function HttpTrace(path: string): Function {
    return assign(path, HttpTraceAction);
}
