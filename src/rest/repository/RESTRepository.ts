import { Repository } from '../../repository';
import { RESTModel } from '../model/RESTModel';

export class RESTRepository extends Repository<RESTModel[]> {
    public getDataById(id: number): RESTModel {
        return this.data.find(model => model.id === id);
    }
}
