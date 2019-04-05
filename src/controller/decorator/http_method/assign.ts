import { Controller } from '../../Controller';
import {
    HTTPConnectAction,
    HTTPDeleteAction,
    HTTPGetAction,
    HTTPHeadAction,
    HTTPOptionsAction,
    HTTPPostAction,
    HTTPPutAction,
    HTTPTraceAction
} from '../../helper';

type Action = HTTPConnectAction
    | HTTPDeleteAction
    | HTTPGetAction
    | HTTPHeadAction
    | HTTPOptionsAction
    | HTTPPostAction
    | HTTPPutAction
    | HTTPTraceAction;

export function assign(path: string, ActionClass: new (path: string, propertyKey: string) => Action): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new ActionClass(path, propertyKey));
    }
}
