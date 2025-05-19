import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import DrinkPurchaseController from "../../../src/controller/drinkPurchase.controller";

describe("DrinkPurchaseController - listDrinksPurchases", () => {
  let controller;
  let mockDrinkPurchaseService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkPurchaseService = {
      get: jest.fn(),
    };

    controller = new DrinkPurchaseController({
      drinkPurchaseService: mockDrinkPurchaseService,
    });

    mockReq = {};

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should list drinks purchases and respond with 200 and list", async () => {
    const fakeDrinksPurchases = [
      { id: "abc", drinkId: "123", quantity: 2 },
      { id: "def", drinkId: "456", quantity: 1 },
    ];

    mockDrinkPurchaseService.get.mockResolvedValue(fakeDrinksPurchases);

    await controller.listDrinksPurchases(mockReq, mockRes);

    expect(mockDrinkPurchaseService.get).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeDrinksPurchases);
  });
});
