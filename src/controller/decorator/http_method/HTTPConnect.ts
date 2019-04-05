import { Controller } from '../../Controller';
import { HTTPConnectAction } from '../../helper/HTTPConnectAction';

export function HTTPConnect(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPConnectAction(path, propertyKey));
    };
}
