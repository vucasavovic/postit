import { IsNotEmpty, IsEmail, IsString, IsAlphanumeric } from 'class-validator'

export class SignupDto{

    @IsAlphanumeric()
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:string


    @IsAlphanumeric()
    //isStrongPass??
    password:string
}

export class SigninDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}

