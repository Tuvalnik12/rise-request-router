const request = require("supertest");
const app = require("./app");

describe("Test the /storeId/:id path", () => {
	test("Response with 201 and store id and service in json", async () => {
		const response = await request(app).get("/storeId/12345");
		expect(response.statusCode).toBe(201);
	});
});

describe("Test the /storeId/:id path. same storeId", () => {
	test("Response with 200 and store id and service in json", async () => {
		const response = await request(app).get("/storeId/12345");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the root path with query string as storeId", () => {
	test("Response with 201 and store id and service in json", async () => {
		const response = await request(app).get("/?storeId=101010");
		expect(response.statusCode).toBe(201);
	});
});

describe("Test the root path with query string. same storeId", () => {
	test("Response with 201 and store id and service in json", async () => {
		const response = await request(app).get("/?storeId=101010");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the root path with http header as storeId", () => {
	test("Response with 201 and store id and service in json", async () => {
		const response = await request(app)
			.get("/")
			.set("storeId", "121212");
		expect(response.statusCode).toBe(201);
	});
});

describe("Test the root path with http header. same storeId", () => {
	test("Response with 201 and store id and service in json", async () => {
		const response = await request(app)
			.get("/")
			.set("storeId", "121212");
		expect(response.statusCode).toBe(200);
	});
});
