import Customer from './entity/customer';
import Address from './entity/address';
import OrderItem from './entity/order_item';
import Order from './entity/order';

let customer = new Customer("124", "Ronaldo Silva");
const address = new Address("Rua Joaquim Marcerlino", 725, "13186-642", "Hortolandia");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10)
const item2 = new OrderItem("2", "Item 2", 15)
const order = new Order("1", "124", [item1,item2]);