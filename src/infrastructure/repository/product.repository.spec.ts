import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/product/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequileze: Sequelize;
    // criar tabelas do banco de dados
    beforeEach(async () => { //async porque vamos trabalhar com banco de dados
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:', //aqui poderia seria test.db para criar arquivo fisico
            logging: false, //nao precisa logar
            sync: { force: true } // para criar as tabelas
        });
        sequileze.addModels([ProductModel])
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product); // nao precisa retorna nada pois esta void para 'create' no 'repository-interface.ts '

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const product2 = new Product("2", "Product 2", 100);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2]

        expect(products).toEqual(foundProducts);
        
    });

});
