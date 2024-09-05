import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}


describe("Unit Test create product use case", () => {


  it("should find a product", async () => {
    const productRepository = MockRepository();
    const productCreateUsecase = new CreateProductUseCase(productRepository);

    const output = await productCreateUsecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });

  });




});
