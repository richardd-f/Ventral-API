import { User } from "../../../generated/prisma";
import prisma from "../../config/prisma";
import { ResponseError } from "../../errors/response-error";
import { LoginInput, RegisterInput } from "./auth.validation";


export class AuthService{

    static async login(data: LoginInput): Promise<string>{
        const user = prisma.user.create({
            data:{
                email: data.email,
                password: data.password
            }
        });
        return "";
    }

    static async register(data: RegisterInput): Promise<User>{
        
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
        data.password = await bcrypt


        const user = prisma.user.create({
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                bio: data.bio,
                img_url: data.img_url,
                date_of_birth: data.date_of_birth,
                current_education: data.current_education
            }
        });
        return user;
    }

}