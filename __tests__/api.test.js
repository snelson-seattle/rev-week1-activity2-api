const request = require("supertest");
const baseURL = "http://localhost:3000";

// GET ALL GROCERY ITEMS
describe("GET /api/groceries", () => {
  const newGroceryItem = {
    name: "milk",
    quantity: 1,
    price: 2.99,
    purchased: false,
  };

  beforeAll(async () => {
    // set up a test grocery item
    await request(baseURL).post("/api/groceries").send(newGroceryItem);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/api/groceries?name=${newGroceryItem.name}`);
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get("/api/groceries");
    expect(response.statusCode).toBe(200);
  });

  it("should return list of grocery items", async () => {
    const response = await request(baseURL).get("/api/groceries");
    expect(response.body.length >= 1).toBe(true);
  });
});

// POST NEW GROCERY ITEM
describe("POST /api/groceries", () => {
  const newGroceryItem = {
    name: "milk",
    quantity: 1,
    price: 2.99,
    purchased: false,
  };

  afterAll(async () => {
    await request(baseURL).delete(`/api/groceries?name=${newGroceryItem.name}`);
  });

  it("should return 201", async () => {
    const response = await request(baseURL)
      .post("/api/groceries")
      .send(newGroceryItem);
    expect(response.statusCode).toBe(201);
  });
});

// UPDATE GROCERY ITEM
describe("Update one grocery item", () => {
  const newGroceryItem = {
    name: "milk",
    quantity: 1,
    price: 2.99,
    purchased: false,
  };

  beforeAll(async () => {
    await request(baseURL).post("/api/groceries").send(newGroceryItem);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/api/groceries?name=${newGroceryItem.name}`);
  });

  it("should update the grocery item if it exists", async () => {
    const response = await request(baseURL)
      .put(`/api/groceries?name=${newGroceryItem.name}`)
      .send({
        name: "milk",
        quantity: 1,
        price: 2.99,
        purchased: true,
      });

    expect(response.statusCode).toBe(201);
  });
});

// DELETE A GROCERY ITEM
describe("Delete one grocery item", () => {
  const newGroceryItem = {
    name: "milk",
    quantity: 1,
    price: 2.99,
    purchased: false,
  };

  beforeAll(async () => {
    await request(baseURL).post("/api/groceries").send(newGroceryItem);
  });

  it("should delete one grocery list item", async () => {
    const response = await request(baseURL).delete(
      `/api/groceries?name=${newGroceryItem.name}`
    );

    expect(response.statusCode).toBe(201);
  });
});
