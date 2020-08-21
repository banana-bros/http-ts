import { HttpGetAction } from '../../helper/http_method/HttpGetAction';
import { assign } from './assign';

export function HttpGet(path: string): Function {
    return assign(path, HttpGetAction);
}
