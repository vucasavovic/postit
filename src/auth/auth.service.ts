/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto } from "./dto"
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
 

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ){}
    
    async signup ( dto: SignupDto) {
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
  

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
          ) {
            // P2002 is the error code for unique constraint violations
            throw new ConflictException('Email or username already exists');
          }
          throw error;
    }
        
    }

    async signin (dto: SigninDto) {
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
             return this.signToken(user.id, user.email);

        } catch (error) {
            return {message: error.message};
        }
    }

   

    async signToken (userId: number, email: string) : Promise<string>{
        const payload = {
            sub:userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');

        //?
        return this.jwt.signAsync(payload,{
            expiresIn:'15min',
            secret
        })
    }
}