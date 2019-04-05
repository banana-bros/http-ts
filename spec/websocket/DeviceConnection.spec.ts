import { DeviceConnection } from '../../src/websocket/DeviceConnection';

describe('DeviceConnection', () => {
    let deviceConnection: DeviceConnection;

    beforeEach(() => {
        deviceConnection = new DeviceConnection(null, null);
    });

    it('should be created', () => {
        expect(deviceConnection).toBeTruthy();
    });
});
