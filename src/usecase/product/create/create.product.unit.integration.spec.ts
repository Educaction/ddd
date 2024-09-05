import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Test create product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUsecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 100)

    await productRepository.create(product);

    const input = {
      name: "Product 1",
      price: 100
    }

    const output = await productCreateUsecase.execute(input)

    expect(input.name).toEqual(output.name);
    expect(input.price).toEqual(output.price);    

  });
});
