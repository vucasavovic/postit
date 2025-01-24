import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}