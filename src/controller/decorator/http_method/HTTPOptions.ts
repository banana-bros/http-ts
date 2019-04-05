import { Controller } from '../../Controller';
import { HTTPOptionsAction } from '../../helper/HTTPOptionsAction';

export function HTTPOptions(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPOptionsAction(path, propertyKey));
    };
}
