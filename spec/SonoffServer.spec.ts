import * as path from 'path';
import { SonoffServer } from '../src/SonoffServer';
import { Config } from '../src/config/Config';

describe('SonoffServer', () => {
    let sonoffServer: SonoffServer;

    beforeEach(() => {
        Config.init('./');
        Config.loadConfigJson(path.resolve(__dirname, './config.json'));

        sonoffServer = new SonoffServer();
    });

    it('should be created', () => {
        expect(sonoffServer).toBeTruthy();
    });
});
