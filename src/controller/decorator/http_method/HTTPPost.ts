import { HTTPPostAction } from '../../helper/HTTPPostAction';
import { assign } from './assign';

export function HTTPPost(path: string): Function {
    return assign(path, HTTPPostAction);
}
