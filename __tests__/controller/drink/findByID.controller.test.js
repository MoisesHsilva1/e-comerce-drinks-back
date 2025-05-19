import { describe, it, expect, jest } from "@jest/globals";
import DrinkController from "../../../src/controller/drink.controller";

describe("DrinkController", () => {
  let controller;
  let mockDrinkService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkService = {
      getByID: jest.fn(),
    };

    controller = new DrinkController({ drinkService: mockDrinkService });

    mockReq = {
      params: {
        id: "123",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should response drink when find by ID", async () => {
    const fakeDrink = { id: 123, name: "Caldo de cana" };
    mockDrinkService.getByID.mockResolvedValue(fakeDrink);

    await controller.findByIdDrink(mockReq, mockRes);

    expect(mockDrinkService.getByID).toHaveBeenCalledWith("123");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeDrink);
  });
});
