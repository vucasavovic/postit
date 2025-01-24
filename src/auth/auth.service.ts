/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async signup(dto: AuthDto){
    //gen pass hash
        const passHash = await argon.hash(dto.password)
    //insert new User
        const user  = await this.prisma.user.create({
            data:{
                username:dto.username,
                email:dto.email,
                passHash
            }
        })
     
        delete (user as any).passHash;

        return user;
    }

    signin(){
        return {message:'Signed in!'}
    }

    signout(){
        
    }
}