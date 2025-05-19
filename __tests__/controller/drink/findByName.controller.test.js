import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import DrinkController from "../../../src/controller/drink.controller";

describe("findByName - Drink controller", () => {
  let controller;
  let mockDrinkService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkService = {
      getByName: jest.fn(),
    };

    controller = new DrinkController({ drinkService: mockDrinkService });

    mockReq = {
      params: {
        name: "caldoDeCana",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return reponse by name", async () => {
    const fakeDrink = { name: "caldoDeCana",  description: "Bebida muito boa" };
    mockDrinkService.getByName.mockResolvedValue(fakeDrink);

    await controller.findByNameDrink(mockReq, mockRes);

    expect(mockDrinkService.getByName).toHaveBeenCalledWith("caldoDeCana");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeDrink);
  });
});
