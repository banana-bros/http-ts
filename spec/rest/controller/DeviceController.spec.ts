import { DeviceController } from '../../../src/rest/controller/DeviceController';
import { DeviceContainer } from '../../../src/data_container/DeviceContainer';

describe('DeviceController', () => {
    let deviceController: DeviceController;

    beforeEach(() => {
        deviceController = new DeviceController(new DeviceContainer([]));
    });

    it('should be created', () => {
        expect(deviceController).toBeTruthy();
    });
});
