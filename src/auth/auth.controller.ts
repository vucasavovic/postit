/* eslint-disable */
import { Controller,Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./dto";
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //dto: 'Data Transfer Object' :)
    @Post('signup')
    async signup( @Body() dto: SignupDto) {
        
       await this.authService.signup(dto);
       return { message: 'Signup successful' };
    }

    @Post('signin')
    async signin(@Res() res: Response, @Body() dto: SigninDto) {
        const token  = await this.authService.signin(dto);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict', // Prevents CSRF (set to 'lax' if needed)
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (e.g., 7 days)
        });

        return res.status(201).send({ message: 'Signin successful' });
         
    }

    @Post('signout')
    async signout(@Res({passthrough:true}) res: Response, ) {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
        return { message: 'Signout successful' };
    }

}

