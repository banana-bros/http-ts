import { HttpPutAction } from '../../helper/http_method/HttpPutAction';
import { assign } from './assign';

export function HttpPut(path: string): Function {
    return assign(path, HttpPutAction);
}
