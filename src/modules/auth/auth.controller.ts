import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import { AuthService } from "./auth.service";

export class AuthController{

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const validatedData = loginSchema.parse(req.body);
            const token = await AuthService.login(validatedData);
            res.status(200).json({
                message: "Login succesfully",
                data: token
            });
        }catch(err){
            next(err);
        }
    }
    
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const validatedData = registerSchema.parse(req.body);
            const token = await AuthService.register(validatedData);
            res.status(201).json({
                message: "Register succesfully",
                data: token
            });
        }catch(err){
            next(err);
        }
    }

}