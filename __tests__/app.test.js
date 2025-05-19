import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

describe("GET /", () => {
  it("Should response with status 200 and message 'Server is running!'", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Server is running!");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
