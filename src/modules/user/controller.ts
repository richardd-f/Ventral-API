import { NextFunction, Request, Response } from "express";
import { UserService } from "./service";
import { UserRequest } from "../../types/auth";
import { ResponseError } from "../../errors/response-error";

export class UserController {
    static async getUserById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            if(!userId) throw new ResponseError(400, "User ID is required");
            const user = await UserService.getUserDataById(userId);

            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async searchUsers(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            if(!name) throw new ResponseError(400, "User name is required");
            const user = await UserService.searchUsers(name);

            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }


}
