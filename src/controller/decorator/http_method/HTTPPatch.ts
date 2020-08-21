import { HttpPatchAction } from '../../helper/http_method/HttpPatchAction';
import { assign } from './assign';

export function HttpPatch(path: string): Function {
    return assign(path, HttpPatchAction);
}
