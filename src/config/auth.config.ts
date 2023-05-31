import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface IAuthConfig {
  jwt: JwtModuleOptions;
}

export default registerAs(
  'auth',
  (): IAuthConfig => ({
    jwt: {
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
    },
  }),
);
