import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usercase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/list/list.customer.usercase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usercase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    }

    const output = await usercase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }
});


customerRoute.get("/", async (req: Request, res: Response) => { 
  const usercase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usercase.execute({});
    res.send(output);
  } catch (err) {
    res.status(500).send(err)
  }  
});