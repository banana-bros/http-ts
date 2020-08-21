import { HttpHeadAction } from '../../helper/http_method/HttpHeadAction';
import { assign } from './assign';

export function HttpHead(path: string): Function {
    return assign(path, HttpHeadAction);
}
