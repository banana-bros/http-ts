import { HTTPGetAction } from '../../helper/HTTPGetAction';
import { assign } from './assign';

export function HTTPGet(path: string): Function {
    return assign(path, HTTPGetAction);
}
