describe("Domain events test", () => {

    it("should registere an envetn handler", () => {

        const eventDispacher = new EventDispatcher();
        const envetHandler = new SendEmailProductIsCreatedHanlder();

        eventDispacher.register("ProductCreatedEvent", envetHandler);

        expect(eventDispacher.geEventHandler["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.geEventHandler["ProductCreatedEvent"].lenght).toBe(1);


    });
})