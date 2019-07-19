import { Controller, HTTPGet } from '../../controller';
import { RESTRepository } from '../repository/RESTRepository';
import { Response, Request } from 'express';

export abstract class RESTController extends Controller<RESTRepository> {
    public static pathName: string;

    @HTTPGet(`/${this.pathName}`)
    public getData(request: Request, response: Response) {
        response.json(this.repository.getData());
    }

    @HTTPGet(`/${this.pathName}/:id`)
    public getDataById(request: Request, response: Response) {
        response.json(this.repository.getDataById(request.query.id));
    }
}
