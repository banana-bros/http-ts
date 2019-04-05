import { HTTPConnectAction } from '../../helper/HTTPConnectAction';
import { assign } from './assign';

export function HTTPConnect(path: string): Function {
    return assign(path, HTTPConnectAction);
}
