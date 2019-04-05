import { HTTPHeadAction } from '../../helper/HTTPHeadAction';
import { assign } from './assign';

export function HTTPHead(path: string): Function {
    return assign(path, HTTPHeadAction);
}
