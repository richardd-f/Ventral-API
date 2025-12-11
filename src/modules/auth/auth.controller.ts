import { NextFunction, Request, Response } from "express";

export class AuthController{

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            
        }catch(err){
            next(err);
        }
    }
    
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            
        }catch(err){
            next(err);
        }
    }

}