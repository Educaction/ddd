const input = {
  name: "John",
  address: {
    street: "Street",
    city: "City",
    number: 123,
    zip: "Zip",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test create customer user case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

    const output = await customerCreateUseCase(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        name: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      },
    });

  })
});