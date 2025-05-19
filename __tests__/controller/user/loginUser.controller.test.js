import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import UserController from "../../../src/controller/user.controller";

describe("UserController - loginUser", () => {
  let controller;
  let mockAuthService;
  let mockUserService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockAuthService = {
      verifyIdToken: jest.fn(),
      getUser: jest.fn(),
      createCustomToken: jest.fn(),
    };

    mockUserService = {};

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

  it("should respond 200 with message, token and user on successful login", async () => {
    const fakeDecodedToken = { uid: "user123" };
    const fakeUserRecord = { uid: "user123", email: "user@example.com" };
    const fakeCustomToken = "custom-token-abc";

    mockAuthService.verifyIdToken.mockResolvedValue(fakeDecodedToken);
    mockAuthService.getUser.mockResolvedValue(fakeUserRecord);
    mockAuthService.createCustomToken.mockResolvedValue(fakeCustomToken);

    await controller.loginUser(mockReq, mockRes);

    expect(mockAuthService.verifyIdToken).toHaveBeenCalledWith("fake-token");
    expect(mockAuthService.getUser).toHaveBeenCalledWith("user123");
    expect(mockAuthService.createCustomToken).toHaveBeenCalledWith("user123");

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Login successful!",
      token: fakeCustomToken,
      user: fakeUserRecord,
    });
  });

  it("should respond 400 with error message on verification failure", async () => {
    const fakeError = new Error("Invalid token");
    mockAuthService.verifyIdToken.mockRejectedValue(fakeError);

    await controller.loginUser(mockReq, mockRes);

    expect(mockAuthService.verifyIdToken).toHaveBeenCalledWith("fake-token");
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid token" });
  });
});
