import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/productModel.js", () => ({
  Products: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

jest.unstable_mockModule("../../repositories/productRepository.js", () => ({
  get: jest.fn(),
  create: jest.fn(),
  show: jest.fn(),
  update: jest.fn(),
  del: jest.fn(),
}));

jest.unstable_mockModule("../../cache/productCache.js", () => ({
  getProductCache: jest.fn().mockResolvedValue(null),
  setProductCache: jest.fn().mockResolvedValue(undefined),
  deleteProductCahce: jest.fn().mockResolvedValue(undefined),
}));

const { default: app } = await import("../../app.js");
const { default: request } = await import("supertest");
const { default: mongoose } = await import("mongoose");
const { faker } = await import("@faker-js/faker");
const { connectDB, clearDB, closeDB } = await import("../setup/mongodb.js");
const { Products } = await import("../../models/productModel.js");
const productRepository = await import("../../cache/productCache.js");

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgPath = path.join(__dirname, "fixtures", "test.png");

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeDB();
});

const makeMockProducts = (n = 5) =>
  Array.from({ length: n }, () => ({
    _id: new mongoose.Types.ObjectId(),
    title: faker.commerce.productName(),
    price: faker.number.int({ min: 1000, max: 100000 }),
    description: faker.commerce.productDescription(),
    image: imgPath,
  }));

describe("GET /api/v1/product", () => {
  test("should return 200 with array of products", async () => {
    const mockProducts = makeMockProducts(5);

    productRepository.get.mockResolvedValue(mockProducts);

    const response = await request(app).get("/api/v1/product");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(5);
  });
});
