import { DeviceContainer } from '../../src/data_container/DeviceContainer';

describe('DeviceContainer', () => {
    let deviceContainer: DeviceContainer;

    beforeEach(() => {
        deviceContainer = new DeviceContainer([]);
    });

    it('should be created', () => {
        expect(deviceContainer).toBeTruthy();
    });
});
