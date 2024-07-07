import EventDispatcher from "./event-dispather";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events test", () => {

    it("should register an event handler", () => {

        const eventDispacher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);


    });

    it("should unregister an event handler", () => {
        const eventDispacher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispacher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispacher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregisterAll();

        expect(
            eventDispacher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispacher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHanlder = jest.spyOn(eventHandler, "handle")

        eventDispacher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            id: 1,
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
            createAt: new Date()
        });
        
        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() dever ser chamado
        eventDispacher.notify(productCreatedEvent);
        
        expect(spyEventHanlder).toHaveBeenCalled();

    })
})