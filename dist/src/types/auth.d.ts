import { Request } from "express";
import { UserJWTPayload } from "../modules/auth/interface";
export interface UserRequest extends Request {
    user?: UserJWTPayload;
}
//# sourceMappingURL=auth.d.ts.map