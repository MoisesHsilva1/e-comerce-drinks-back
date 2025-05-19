import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import DrinkPurchaseController from "../../../src/controller/drinkPurchase.controller";

describe("DrinkPurchaseController - saveDrinkPurchase", () => {
  let controller;
  let mockDrinkPurchaseService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkPurchaseService = {
      create: jest.fn(),
    };

    controller = new DrinkPurchaseController({
      drinkPurchaseService: mockDrinkPurchaseService,
    });

    mockReq = {
      body: {
        drinkId: "123",
        quantity: 2,
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should save drink purchase and respond with 201 and saved object", async () => {
    const fakeSavedDrink = { id: "abc123", drinkId: "123", quantity: 2 };

    mockDrinkPurchaseService.create.mockResolvedValue(fakeSavedDrink);

    await controller.saveDrinkPurchase(mockReq, mockRes);

    expect(mockDrinkPurchaseService.create).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeSavedDrink);
  });

  it("should respond 400 with error message when service throws", async () => {
    const error = new Error("Creation failed");
    mockDrinkPurchaseService.create.mockRejectedValue(error);

    await controller.saveDrinkPurchase(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Creation failed" });
  });
});
