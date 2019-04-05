import { MQTTConnector } from '../../src/mqtt/MQTTConnector';

describe('MQTTConnector', () => {
    let mqttConnector: MQTTConnector;

    beforeEach(() => {
        mqttConnector = new MQTTConnector(null);
    });

    it('should be created', () => {
        expect(mqttConnector).toBeTruthy();
    });
});
