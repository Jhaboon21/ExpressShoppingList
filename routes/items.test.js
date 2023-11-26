process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb");
let item = { name: "test", price: 100 };

beforeEach(async() => {
    items.push(item);
});

afterEach(async() => {
    items = [];
});

describe("GET /items", function () {
    test("Get a list of items", async function () {
        const response = await request(app).get('/items');
        const { items } = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", function () {
    test("Get a single item", async function () {
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });

    test("Respond with 404 if cannot find item", async function () {
        const response = await request(app).get('/items/0');
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("Create a new item", async function () {
        const response = await request(app)
            .post('/items')
            .send({
                name: "test2",
                price: 400
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).toEqual("test2");
        expect(response.body.item.price).toEqual(400);
    });
});

describe("PATCH /items/:name", function () {
    test("Update a single item", async function () {
        const response = await request(app)
            .patch(`/items/${item.name}`)
            .send({
                name: "patchTest"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({ name: "patchTest" });
    });

    test("Respond with 404 if cannot find item", async function () {
        const response = await request(app).patch(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Delete a single item", async function () {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Deleted" });
    });
});