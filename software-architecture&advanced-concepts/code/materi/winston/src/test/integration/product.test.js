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
  deleteProductCache: jest.fn().mockResolvedValue(undefined),
}));

const { default: app } = await import("../../app.js");
const { default: request } = await import("supertest");
const { default: mongoose } = await import("mongoose");
const { faker } = await import("@faker-js/faker");
const { connectDB, clearDB, closeDB } = await import("../setup/mongodb.js");
const { Products } = await import("../../models/productModel.js");
const productRepository =
  await import("../../repositories/productRepository.js");
const { getProductCache } = await import("../../cache/productCache.js");

import path, { dirname } from "path";
import { title } from "process";
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

  test("should return 200 with empty array when no product", async () => {
    const mockProducts = makeMockProducts([]);

    productRepository.get.mockResolvedValue(mockProducts);

    const response = await request(app).get("/api/v1/product");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  test("should return cache data if cache exists", async () => {
    const cachedProducts = makeMockProducts(2);

    getProductCache.mockResolvedValue(cachedProducts);

    const response = await request(app).get("/api/v1/product");

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(productRepository.get).not.toHaveBeenCalled();
  });

  test("should return 500 if repository throws error", async () => {
    getProductCache.mockResolvedValue(null);
    productRepository.get.mockRejectedValue(new Error("DB Error"));

    const response = await request(app).get("/api/v1/product");

    expect(response.statusCode).toBe(500);
  });
});

describe("GET /api/v1/product/:title", () => {
  test("should return 200 with single product", async () => {
    const mockProduct = makeMockProducts(1);

    productRepository.show.mockResolvedValue(mockProduct);

    const response = await request(app).get("/api/v1/product/someTitle");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data[0]).toMatchObject({
      title: mockProduct[0].title,
      description: mockProduct[0].description,
      price: mockProduct[0].price,
      image: mockProduct[0].image,
    });
  });

  test("should return 500 if repository throws error", async () => {
    getProductCache.mockResolvedValue(null);
    productRepository.show.mockRejectedValue(new Error("Not Found"));

    const response = await request(app).get("/api/v1/product/NotExist");

    expect(response.statusCode).toBe(500);
  });
});

describe("POST /api/v1/product", () => {
  test("should return 201 when product created successfully", async () => {
    const newProduct = {
      _id: new mongoose.Types.ObjectId(),
      title: faker.commerce.productName(),
      price: faker.number.int({ min: 1000, max: 100000 }),
      description: faker.commerce.productDescription(),
      image: "test.png",
    };

    productRepository.create.mockResolvedValue(newProduct);

    const response = await request(app)
      .post("/api/v1/product")
      .field("title", newProduct.title)
      .field("price", newProduct.price)
      .field("description", newProduct.description)
      .attach("image", imgPath);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe("Success");
  });

  test("should return 500 if repository throws error", async () => {
    productRepository.create.mockRejectedValue(new Error("Create failed"));

    const response = await request(app)
      .post("/api/v1/product")
      .field("title", "test")
      .field("price", 500)
      .field("description", "hello world")
      .attach("image", imgPath);

    expect(response.statusCode).toBe(500);
  });
});

describe("PUT /api/v1/product/:title", () => {
  test("should return 200 when product update successfully", async () => {
    const existingProduct = {
      _id: new mongoose.Types.ObjectId(),
      title: "OldTitle",
      price: 8000,
      description: "lorem ipsum",
      image: null,
    };

    const updateProduct = { ...existingProduct, title: "new Title" };

    Products.findOne.mockResolvedValue(existingProduct);
    productRepository.update.mockResolvedValue(updateProduct);

    const response = await request(app)
      .put("/api/v1/product/oldTitle")
      .field("title", "newTitle")
      .field("price", 9000)
      .field("description", "lorem ipsum")
      .attach("image", imgPath);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
  });

  test("should return 404 if product not found", async () => {
    Products.findOne.mockResolvedValue(null);

    const response = await request(app)
      .put("/api/v1/product/NotExist")
      .field("title", "random")
      .field("price", 9000);

    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /api/v1/product/:title", () => {
  test("should return 200 when product deleted successfully", async () => {
    const existingProduct = {
      _id: new mongoose.Types.ObjectId(),
      title: "nobody",
      image: null,
    };

    Products.findOne.mockResolvedValue(existingProduct);
    productRepository.del.mockResolvedValue({ deletedCount: 1 });
    const response = await request(app).delete("/api/v1/product/ToDelete");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe("Success");
  });

  test("should return 500 if repository throws error", async () => {
    Products.findOne.mockResolvedValue({ title: "ToDelete", image: null });
    productRepository.del.mockRejectedValue(new Error("Delete failed"));

    const response = await request(app).delete("/api/v1/product/ToDelete");

    expect(response.statusCode).toBe(500);
  });
});
