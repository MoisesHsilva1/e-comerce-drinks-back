import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import UserController from "../../../src/controller/user.controller";

describe("UserController - getLoggedUser", () => {
  let controller;
  let mockAuthService;
  let mockUserService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockAuthService = {
      verifyIdToken: jest.fn(),
    };

    mockUserService = {
      getUserByUid: jest.fn(),
    };

    controller = new UserController({
      authService: mockAuthService,
      userService: mockUserService,
      adminFirebase: {},
    });

    mockReq = {
      headers: {
        authorization: "Bearer fake-token",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should respond with user data when token is valid", async () => {
    const fakeDecoded = { uid: "user123" };
    const fakeUserData = { id: 1, name: "Moisés" };

    mockAuthService.verifyIdToken.mockResolvedValue(fakeDecoded);
    mockUserService.getUserByUid.mockResolvedValue(fakeUserData);

    await controller.getLoggedUser(mockReq, mockRes);

    expect(mockAuthService.verifyIdToken).toHaveBeenCalledWith("fake-token");
    expect(mockUserService.getUserByUid).toHaveBeenCalledWith("user123");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      logged: true,
      user: fakeUserData,
    });
  });
});
