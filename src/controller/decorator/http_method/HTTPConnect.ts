import { HttpConnectAction } from '../../helper/http_method/HttpConnectAction';
import { assign } from './assign';

export function HttpConnect(path: string): Function {
    return assign(path, HttpConnectAction);
}
