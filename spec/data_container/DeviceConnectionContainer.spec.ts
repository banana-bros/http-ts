import { DeviceConnectionContainer } from '../../src/data_container/DeviceConnectionContainer';

describe('DeviceConnectionContainer', () => {
    let deviceConnectionContainer: DeviceConnectionContainer;

    beforeEach(() => {
        deviceConnectionContainer = new DeviceConnectionContainer([]);
    });

    it('should be created', () => {
        expect(deviceConnectionContainer).toBeTruthy();
    });
});
