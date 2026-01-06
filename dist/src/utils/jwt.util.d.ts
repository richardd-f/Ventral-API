import { UserJWTPayload } from "../modules/auth/interface";
import { StringValue } from "ms";
export declare function generateToken(payload: UserJWTPayload, expiryTime?: StringValue): string;
export declare const verifyToken: (token: string) => UserJWTPayload;
//# sourceMappingURL=jwt.util.d.ts.map