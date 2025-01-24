/* eslint-disable prettier/prettier */
import { Controller,Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./dto";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //dto: 'Data Transfer Object' :)
    @Post('signup')
    signup(@Body() dto: SignupDto) {
        
       return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Post('signout')
    signout() {
        return this.authService.signout();
    }

}

