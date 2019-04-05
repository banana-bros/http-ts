import { Controller } from '../../Controller';
import { HTTPTraceAction } from '../../helper/HTTPTraceAction';

export function HTTPTrace(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPTraceAction(path, propertyKey));
    };
}
