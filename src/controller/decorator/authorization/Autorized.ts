import { Controller } from 'src/controller/Controller';

export function Authorized(): Function {
    return function (target: Controller<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.authorizedActions) {
            target.authorizedActions = new Set<string>();
        }
        target.authorizedActions.add(propertyKey);
    };
}
