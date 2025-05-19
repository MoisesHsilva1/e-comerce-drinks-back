import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import DrinkController from "../../../src/controller/drink.controller.js";

describe("createDrink - DrinkController", () => {
  let controller;
  let mockDrinkService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockDrinkService = {
      create: jest.fn(),
    };

    controller = new DrinkController({ drinkService: mockDrinkService });

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should respond 201 and return the new drink", async () => {
    const fakeDrink = {
      name: "Fanta Uva",
      description: "Deliciosa",
      price: 5,
      qtd: { p: 10, m: 20, g: 30 },
      image: "uploads/fanta.jpg",
    };

    mockReq = {
      body: {
        name: fakeDrink.name,
        description: fakeDrink.description,
        price: fakeDrink.price,
        qtd: JSON.stringify(fakeDrink.qtd),
      },
      file: {
        path: fakeDrink.image,
      },
    };

    mockDrinkService.create.mockResolvedValue(fakeDrink);

    await controller.createDrink(mockReq, mockRes);

    expect(mockDrinkService.create).toHaveBeenCalledWith({
      name: "Fanta Uva",
      description: "Deliciosa",
      price: 5,
      qtd: { p: 10, m: 20, g: 30 },
      image: "uploads/fanta.jpg",
    });

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeDrink);
  });

  it("should respond 400 if service throws error", async () => {
    const error = new Error("Falha ao criar bebida");

    mockReq = {
      body: {
        name: "Sprite",
        description: "Leve",
        price: 4,
        qtd: JSON.stringify({ p: 5, m: 10, g: 15 }),
      },
      file: {
        path: "uploads/sprite.jpg",
      },
    };

    mockDrinkService.create.mockRejectedValue(error);

    await controller.createDrink(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Falha ao criar bebida",
    });
  });
});
