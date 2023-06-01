import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import authConfig from 'src/config/auth.config';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlAuthGuard,
    // },
  ],
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: (configService: ConfigService) =>
        configService.get<JwtModuleOptions>('auth.jwt'),
      inject: [ConfigService],
    }),
    PassportModule,
    UsersModule,
  ],
})
export class AuthModule {}
