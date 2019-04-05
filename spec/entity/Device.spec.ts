import { Device } from '../../src/entity/Device';

describe('Device', () => {
    let device: Device;

    beforeEach(() => {
        device = new Device();
    });

    it('should be created', () => {
        expect(device).toBeTruthy();
    });
});
