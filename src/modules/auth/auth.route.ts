import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoute: Router = Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);