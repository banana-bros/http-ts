import { Controller } from '../../Controller';
import { HTTPPutAction } from '../../helper/HTTPPutAction';

export function HTTPPut(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPPutAction(path, propertyKey));
    };
}
