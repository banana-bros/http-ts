import { Controller } from '../../Controller';
import { HTTPDeleteAction } from '../../helper/HTTPDeleteAction';

export function HTTPDelete(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPDeleteAction(path, propertyKey));
    };
}
