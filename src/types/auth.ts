import { Request } from "express";
import { UserJWTPayload } from "../modules/auth/interface";


export interface UserResponse extends Request{
    user?: UserJWTPayload;
}