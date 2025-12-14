import { email } from "zod";
import { User } from "../../../generated/prisma";
import prisma from "../../config/prisma";
import { ResponseError } from "../../errors/response-error";
import { generateToken } from "../../utils/jwt.util";
import { LoginInput, RegisterInput } from "./validation";
import bcrypt from "bcrypt";

export class AuthService{
    static async login(data: LoginInput): Promise<string>{
        const user = await prisma.user.findFirst({
            where:{
                email: data.email
            }
        });

        if(!user){
            throw new ResponseError(400, "Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if(!isPasswordValid){
            throw new ResponseError(400, "Invalid email or password");
        }

        return generateToken({
            id: user.user_id,
            name: user.name,
            email: user.email
        });
    }

    static async register(data: RegisterInput): Promise<string>{
        
        // Check if email already exists
        const email = await prisma.user.findUnique({
            where:{
                email: data.email
            }
        })
        if(email){
            throw new ResponseError(400, "Email already exists");
        }

        // Encrypt password
        data.password = await bcrypt.hash(data.password, 10);

        const user =  await prisma.user.create({
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                bio: data.bio,
                img_url: data.img_url,
                date_of_birth: new Date(data.date_of_birth),
            }
        });

        return generateToken({
            id:user.user_id, 
            name: user.name, 
            email: user.email
        });
    }

}