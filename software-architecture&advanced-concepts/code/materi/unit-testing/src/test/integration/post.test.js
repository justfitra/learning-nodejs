import request from "supertest";
import app from "../../app.js";
import { dbConnect } from "../../config/db.js";
import mongoose from "mongoose";
import { envConfig } from "../../config/envConfig.js";
faker;

beforeAll(async () => {
  await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /posts", () => {
  test("should return posts", async () => {
    const response = await request(app).get("/api/v1/post");

    expect(response.statusCode).toBe(200);
  });
});

describe("POST /posts", () => {
  test("should create post", async () => {
    const payload = {};
  });
});
