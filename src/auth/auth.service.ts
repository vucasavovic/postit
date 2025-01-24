/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto } from "./dto"
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    
    async signup(dto: SignupDto){
    //gen pass hash
        const passHash = await argon.hash(dto.password)
    //insert new User
    try {
        const user  = await this.prisma.user.create({
            data:{
                username:dto.username,
                email:dto.email,
                passHash
            }
        })
     
        delete (user as any).passHash;

        return user;
    } catch (error) {
        return {message:error.message};
    }
        
    }

    async signin(dto: SigninDto){
        try {
            //1. Check if the user exists by email
             const user = await this.prisma.user.findUnique({
                where:{
                    email:dto.email
                }
             });

             if(!user) 
                throw new ForbiddenException('Incorrect credentials!');
               
             //3. Check pass validity

             const passMatch = await argon.verify(user.passHash, dto.password);
            
             if(!passMatch)
                throw new ForbiddenException('Incorrect credentials!');


             //3. Send JWT and user data

             delete (user as any).passHash;
             return user;

        } catch (error) {
            return {message: error.message};
        }
    }

    signout(){

    }
}