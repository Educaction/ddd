import EventInterface from "../event.interface";

export default class ProductCreatedEvent implements EventInterface {
    datatimeOccourred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.datatimeOccourred = new Date();
        this.eventData = eventData;
    }
}