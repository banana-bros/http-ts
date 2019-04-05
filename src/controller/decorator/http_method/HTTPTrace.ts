import { HTTPTraceAction } from '../../helper/HTTPTraceAction';
import { assign } from './assign';

export function HTTPTrace(path: string): Function {
    return assign(path, HTTPTraceAction);
}
