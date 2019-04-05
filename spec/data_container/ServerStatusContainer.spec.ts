import { ServerStatusContainer } from '../../src/data_container/ServerStatusContainer';

describe('ServerStatusContainer', () => {
    let serverStatusContainer: ServerStatusContainer;

    beforeEach(() => {
        serverStatusContainer = new ServerStatusContainer([]);
    });

    it('should be created', () => {
        expect(serverStatusContainer).toBeTruthy();
    });
});
