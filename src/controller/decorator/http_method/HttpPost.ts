import { HttpPostAction } from '../../helper/http_method/HttpPostAction';
import { assign } from './assign';

export function HttpPost(path: string): Function {
    return assign(path, HttpPostAction);
}
