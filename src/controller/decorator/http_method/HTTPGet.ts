import { Controller } from '../../Controller';
import { HTTPGetAction } from '../../helper/HTTPGetAction';

export function HTTPGet(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPGetAction(path, propertyKey));
    };
}
