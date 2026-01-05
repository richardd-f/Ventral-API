import { Router } from "express";
import { UserController } from "./controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const UserRoutes: Router = Router();

UserRoutes.get("/users/id/:userId", authMiddleware, UserController.getUserById);
UserRoutes.get("/users/search/:name", authMiddleware, UserController.searchUsers);

