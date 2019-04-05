import { ServerStatus } from '../../src/entity/ServerStatus';

describe('ServerStatus', () => {
    let serverStatus: ServerStatus;

    beforeEach(() => {
        serverStatus = new ServerStatus();
    });

    it('should be created', () => {
        expect(serverStatus).toBeTruthy();
    });
});
