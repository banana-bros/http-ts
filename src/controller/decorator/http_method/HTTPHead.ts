import { Controller } from '../../Controller';
import { HTTPHeadAction } from '../../helper/HTTPHeadAction';

export function HTTPHead(path: string): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }
        target.actions.push(new HTTPHeadAction(path, propertyKey));
    };
}
