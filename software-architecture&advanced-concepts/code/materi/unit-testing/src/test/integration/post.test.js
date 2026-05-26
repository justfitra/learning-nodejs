import request from "supertest";
import app from "../../app.js";
import { dbConnect } from "../../config/db.js";
import mongoose from "mongoose";
import { envConfig } from "../../config/envConfig.js";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imgPath = path.join(__dirname, "fixtures", "test.png");
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

describe("SHOW /posts", () => {
  test("should return post", async () => {
    const response = await request(app).get("/api/v1/post/handuk");

    expect(response.statusCode).toBe(200);
  });
});

describe("POST /posts", () => {
  test("should create post", async () => {
    const response = await request(app)
      .post("/api/v1/post")
      .field("title", faker.person.fullName())
      .field("price", faker.number.int())
      .attach("image", imgPath);

    console.log(response.error);

    expect(response.statusCode).toBe(201);
  });
});
