import { HttpDeleteAction } from '../../helper/http_method/HttpDeleteAction';
import { assign } from './assign';

export function HttpDelete(path: string): Function {
    return assign(path, HttpDeleteAction);
}
