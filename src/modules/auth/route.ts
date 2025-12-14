import { Router } from "express";
import { AuthController } from "./controller";

export const authRoute: Router = Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);