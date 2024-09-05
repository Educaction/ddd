import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345"
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("John");
    expect(response.body.address.street).toBe("Street")
    expect(response.body.address.city).toBe("City")
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe("12345")
  });
});