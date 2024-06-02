import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';

let customer = new Customer("124", "Ronaldo Silva");
const address = new Address("Rua Joaquim Marcerlino", 725, "13186-642", "Hortolandia");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
const order = new Order("1", "124", [item1,item2]);