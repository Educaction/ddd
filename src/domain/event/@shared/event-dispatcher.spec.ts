import EventDispatcher from "./event-dispather";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";

describe("Domain events test", () => {

    it("should registere an envetn handler", () => {

        const eventDispacher = new EventDispatcher();
        const envetHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", envetHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);


    });
})