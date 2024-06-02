import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";

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
});