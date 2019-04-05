import { HTTPDeleteAction } from '../../helper/HTTPDeleteAction';
import { assign } from './assign';

export function HTTPDelete(path: string): Function {
    return assign(path, HTTPDeleteAction);
}
