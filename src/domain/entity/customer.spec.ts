import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        expect(() => {
            // Arrange
            const customer = new Customer("123", "John");

            // Act
            customer.changeName("Jane");

            // Assert
            expect(customer.name).toBe("Jane");
        });

    });
    it("should change activate customer", () => {
        expect(() => {

            const customer = new Customer("1", "Csutomer 1");
            const address = new Address("Street 1", 123, "13330-000", "Sao Paulo");
            customer.Address = address;

            customer.activate();

            expect(customer.isActivate()).toBe(true);
        });
    });
    it("should change deactivate", () => {
        expect(() => {

            const customer = new Customer("1", "Csutomer 1");
            customer.deactivate();
            expect(customer.isActivate()).toBe(false);
        });
    }); 
    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Csutomer 1");
            customer.activate();
            
        }).toThrow("Address is mandatory to activate a");
    });
    
    it("shoul add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);        
    })
});
