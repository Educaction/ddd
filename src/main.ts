import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';
import OrderItem from './domain/checkout/entity/order_item';
import Order from './domain/checkout/entity/order';

let customer = new Customer("124", "Ronaldo Silva");
const address = new Address("Rua Joaquim Marcerlino", 725, "13186-642", "Hortolandia");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
const order = new Order("1", "124", [item1,item2]);