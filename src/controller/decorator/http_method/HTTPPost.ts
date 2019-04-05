import { Controller } from '../../Controller';
import { HTTPPostAction } from '../../helper/HTTPPostAction';

export function HTTPPost(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPPostAction(path, propertyKey));
    };
}
