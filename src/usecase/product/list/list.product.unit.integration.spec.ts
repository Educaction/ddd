
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usercase";
import { Sequelize } from "sequelize-typescript";

const product1 = ProductFactory.createNewProduct("Product 1", 100)

const product2 = ProductFactory.createNewProduct("Product 2", 200)


describe("Test for listing product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.createNewProduct("Product 1", 100);
    const product2 = ProductFactory.createNewProduct("Product 2", 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await productListUseCase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price); 
  });
});