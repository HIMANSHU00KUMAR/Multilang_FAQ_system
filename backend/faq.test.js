const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");

describe("FAQ API", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new FAQ", async () => {
    const response = await request(app).post("/api/faqs").send({
      question: "Test question?",
      answer: "Test answer",
    });

    expect(response.status).toBe(201);
    expect(response.body.question.en).toBe("Test question?");
  });

  it("should get FAQs with translations", async () => {
    const response = await request(app).get("/api/faqs?lang=hi");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
