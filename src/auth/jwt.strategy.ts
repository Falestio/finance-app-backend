import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service'; // Import UserService to find users
import { JwtPayload } from './jwt-payload.interface'; // Create this interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.cookies.jwt; // Extract JWT from cookies
        },
      ]),
      ignoreExpiration: false, // Set to true if you want to ignore expiration
      secretOrKey: 'somesecretefallingdownthehole', // Your JWT secret
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Return the user object
  }
}
