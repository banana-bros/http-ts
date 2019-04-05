import { HTTPOptionsAction } from '../../helper/HTTPOptionsAction';
import { assign } from './assign';

export function HTTPOptions(path: string): Function {
    return assign(path, HTTPOptionsAction);
}
