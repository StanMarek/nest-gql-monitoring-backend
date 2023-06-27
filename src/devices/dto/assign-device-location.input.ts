import { Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

export class AssignDeviceLocationInput {
  @Field()
  @IsMongoId()
  deviceId: string;

  @Field()
  @IsMongoId()
  locationId: string;
}
