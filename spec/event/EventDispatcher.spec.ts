import { EventDispatcher } from '../../src/event/EventDispatcher';

describe('EventDispatcher', () => {
    let eventDispatcher: EventDispatcher;

    beforeEach(() => {
        eventDispatcher = new EventDispatcher();
    });

    it('should be created', () => {
        expect(eventDispatcher).toBeTruthy();
    });
});
