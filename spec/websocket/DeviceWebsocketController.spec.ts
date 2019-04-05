import { DeviceWebsocketController } from '../../src/websocket/DeviceWebsocketController';
import { DeviceContainer } from '../../src/data_container/DeviceContainer';

describe('DeviceWebsocketController', () => {
    let deviceWebSocketController: DeviceWebsocketController;

    beforeEach(() => {
        deviceWebSocketController = new DeviceWebsocketController(new DeviceContainer([]));
    });

    it('should be created', () => {
        expect(deviceWebSocketController).toBeTruthy();
    });
});
