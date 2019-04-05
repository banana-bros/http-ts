import { StatusController } from '../../../src/rest/controller/StatusController';
import { ServerStatusContainer } from '../../../src/data_container/ServerStatusContainer';
import { ServerStatus } from '../../../src/entity/ServerStatus';

describe('StatusController', () => {
    let statusController: StatusController;

    beforeEach(() => {
        statusController = new StatusController(new ServerStatusContainer(new ServerStatus()));
    });

    it('should be created', () => {
        expect(statusController).toBeTruthy();
    });
});
