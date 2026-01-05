import { Router } from "express";
import { AuthController } from "./controller";

export const AuthRoutes: Router = Router();

AuthRoutes.post("/login", AuthController.login);
AuthRoutes.post("/register", AuthController.register);