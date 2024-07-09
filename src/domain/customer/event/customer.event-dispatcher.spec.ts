import { Sequelize } from 'sequelize-typescript';

import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import EventDispatcher from "../../@shared/event/event-dispather";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/EnviaConsoleLog1Handler";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import EnviaConsoleLog2Handler from './handler/EnviaConsoleLog2Handler';
import EnviaConsoleLogHandler from './handler/EnviaConsoleLogHandler';

describe("Domain events customer test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    it("should register an event handler", () => {

        const eventDispacher = new EventDispatcher();

        const envetHandler1 = new EnviaConsoleLog1Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler1);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(envetHandler1);

        const envetHandler2 = new EnviaConsoleLog2Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler2);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(envetHandler2);

    });

    it("should unregister an event handler", () => {
        const eventDispacher = new EventDispatcher();

        const envetHandler1 = new EnviaConsoleLog1Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler1);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(envetHandler1);

        const envetHandler2 = new EnviaConsoleLog2Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler2);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(envetHandler2);

        eventDispacher.unregister("CustomerCreatedEvent", envetHandler1);

        expect(
            eventDispacher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

    });

    it("should unregister all event handlers", () => {
        const eventDispacher = new EventDispatcher();

        const envetHandler = new EnviaConsoleLog1Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(envetHandler);

        const envetHandler2 = new EnviaConsoleLog2Handler();
        eventDispacher.register("CustomerCreatedEvent", envetHandler2);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(envetHandler2);

        eventDispacher.unregisterAll();

        expect(
            eventDispacher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all event handlers customer created", async () => {
        const eventDispacher = new EventDispatcher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        const spyEventHanlder1 = jest.spyOn(eventHandler1, "handle")
        eventDispacher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const envetHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHanlder2 = jest.spyOn(envetHandler2, "handle")
        eventDispacher.register("CustomerCreatedEvent", envetHandler2);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(envetHandler2);

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            createAt: new Date()
        });

        eventDispacher.notify(customerCreatedEvent);

        expect(spyEventHanlder1).toHaveBeenCalled();
        expect(spyEventHanlder2).toHaveBeenCalled();

    });

    it("should notify all event handlers address updated", async () => {
        const eventDispacher = new EventDispatcher();

        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHanlder = jest.spyOn(eventHandler, "handle")
        eventDispacher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);


        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            newAddress: customer.Address.toString(),
            createAt: new Date()
        });

        eventDispacher.notify(customerCreatedEvent);

        expect(spyEventHanlder).toHaveBeenCalled();

    })

})