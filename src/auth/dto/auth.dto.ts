import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class SignupDto{
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

export class SigninDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}

