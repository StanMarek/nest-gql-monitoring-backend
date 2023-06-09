import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from 'src/devices/devices.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    DevicesModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => UserSchema,
        // inject: [DevicesService],
        // useFactory: (devicesService: DevicesService) => {
        //   const schema = UserSchema;
        //   schema.pre('deleteOne', async function () {
        //     console.log('pre deleteOne');
        //     // await devicesService.deleteMany({ user: this.getQuery()._id });
        //   });
        //   return schema;
        // },
      },
    ]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
