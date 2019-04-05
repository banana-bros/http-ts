import { HTTPPutAction } from '../../helper/HTTPPutAction';
import { assign } from './assign';

export function HTTPPut(path: string): Function {
    return assign(path, HTTPPutAction);
}
