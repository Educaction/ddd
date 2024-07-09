import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerCreatedEvent implements EventInterface {
    datatimeOccourred: Date;
    eventData: Customer;

    constructor(eventData: any) {
        this.datatimeOccourred = new Date();
        this.eventData = eventData;
    }
}