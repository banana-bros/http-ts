import { Controller } from '../../Controller';
import { HttpAction } from '../../helper';

export function assign(path: string, HttpActionClass: new (path: string, propertyKey: string) => HttpAction): Function {
    return function (target: Controller<any, any, any, any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.actions) {
            target.actions = [];
        }

        target.actions.push(new HttpActionClass(path, propertyKey));
    };
}
