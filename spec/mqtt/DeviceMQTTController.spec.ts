import { DeviceMQTTController } from '../../src/mqtt/DeviceMQTTController';

describe('DeviceMQTTController', () => {
    let deviceMQTTController: DeviceMQTTController;

    beforeEach(() => {
        deviceMQTTController = new DeviceMQTTController(null);
    });

    it('should be created', () => {
        expect(deviceMQTTController).toBeTruthy();
    });
});
