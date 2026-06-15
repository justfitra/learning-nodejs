import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { clearDB, closeDB, connectDB } from "../setup/mongodb.js";
import app from "../../app.js";
import { jest } from "@jest/globals";
import request from "supertest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imgPath = path.join(__dirname, "fixtures", "test.png");

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await closeDB();
});

jest.mock("../../repositories/productRepository.js");

describe("GET /products", () => {
  test("should return products", async () => {
    const response = await request(app).get("/api/v1/product");

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("SHOW /products", () => {
  test("should return product", async () => {
    const response = await request(app).get("/api/v1/product/bia22");

    expect(response.statusCode).toBe(200);

    expect(Object.is(response.body)).toBe(true);
  });
});
