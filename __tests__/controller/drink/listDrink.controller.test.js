import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import DrinkController from "../../../src/controller/drink.controller.js";

describe("listDink - DrinkController", () => {
  let controller;
  let mockDrinkService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkService = {
      get: jest.fn(),
    };

    controller = new DrinkController({ drinkService: mockDrinkService });

    mockReq = {};

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should respond 200 and list of drinks", async () => {
    const fakeDrinks = [
      {
        id: 1,
        name: "Coca-Cola",
        description: "bebida gelada",
        qtd: { m: 150, g: 300, p: 100 },
        price: 100,
      },
      {
        id: 2,
        name: "Guaraná",
        description: "bebida gelada",
        qtd: { m: 150, g: 300, p: 100 },
        price: 100,
      },
    ];

    mockDrinkService.get.mockResolvedValue(fakeDrinks);

    await controller.listDink(mockReq, mockRes);

    expect(mockDrinkService.get).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeDrinks);
  });
});
