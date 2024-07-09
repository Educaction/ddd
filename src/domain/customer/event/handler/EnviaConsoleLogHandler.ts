import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CusomterAddressUpdatedEvent from '../customer-address-updated.event';

export default class EnviaConsoleLogHandler
    implements EventHandlerInterface<CusomterAddressUpdatedEvent> {

    handle(event: CusomterAddressUpdatedEvent): void {
        console.log(`Customer address changed to ${event.eventData.name}`);
    }
}