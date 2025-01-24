/* eslint-disable prettier/prettier */
import { Controller,Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //dto: 'Data Transfer Object' :)
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        
       return this.authService.signup(dto);
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }

    @Post('signout')
    signout() {
        return this.authService.signout();
    }

}

