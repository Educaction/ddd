import EventDispatcher from "./event-dispather";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";

describe("Domain events test", () => {

    it("should register an event handler", () => {

        const eventDispacher = new EventDispatcher();
        const envetHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", envetHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(envetHandler);


    });

    it("should unregister an event handler", () => {
        const eventDispacher = new EventDispatcher();
        const envetHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", envetHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(envetHandler);

        eventDispacher.unregister("ProductCreatedEvent", envetHandler);

        expect(
            eventDispacher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispacher = new EventDispatcher();
        const envetHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", envetHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(envetHandler);

        eventDispacher.unregisterAll();

        expect(
            eventDispacher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    });
})