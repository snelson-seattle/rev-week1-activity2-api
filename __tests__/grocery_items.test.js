const {
  groceryItems,
  returnGroceryItems,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
} = require("../app");

describe("Testing API functions", () => {
  // Retrieve grocery list items
  beforeAll(() => {
    groceryItems.push({
      name: "milk",
      quantity: 1,
      price: 2.99,
      purchased: false,
    });
  });

  describe("GET - Return list of grocery items", () => {
    it("Should return the list of grocery items", () => {
      let results = returnGroceryItems();

      expect(results.length).toBeGreaterThan(0);

      expect(results[0]).toStrictEqual({
        name: "milk",
        quantity: 1,
        price: 2.99,
        purchased: false,
      });
    });
  });

  describe("POST - Add a new item to the grocery list", () => {
    let newItem = {
      name: "butter",
      quantity: 1,
      price: 4.99,
      purchased: false,
    };

    it("Should add a new item to the grocery list", () => {
      let results = addGroceryItem(newItem);

      expect(results.message).toBe("New item added successfully");

      expect(results.item).toStrictEqual({
        name: "butter",
        quantity: 1,
        price: 4.99,
        purchased: false,
      });
    });
  });

  describe("PUT - Update a purchased status of grocery list item", () => {
    it("Should update the purchased status to true for a given item", () => {
      let results = updateGroceryItem("milk");

      expect(results).toStrictEqual({
        name: "milk",
        quantity: 1,
        price: 2.99,
        purchased: true,
      });
    });
  });

  describe("DELETE - Remove an item from the grocery list", () => {
    it("Should remove the given item from the grocery list", () => {
      let results = deleteGroceryItem("milk");

      console.log(results);

      expect(results).toStrictEqual({
        name: "milk",
        quantity: 1,
        price: 2.99,
        purchased: true,
      });
    });
  });
});
