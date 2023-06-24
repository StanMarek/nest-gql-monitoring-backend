import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Location, LocationSchema } from './entities/location.entity';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';

@Module({
  providers: [LocationsResolver, LocationsService],
  imports: [
    UsersModule,
    MongooseModule.forFeatureAsync([
      { name: Location.name, useFactory: () => LocationSchema },
    ]),
  ],
})
export class LocationsModule {}
