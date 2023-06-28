import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class AssignDeviceLocationInput {
  @Field()
  @IsMongoId()
  deviceId: string;

  @Field()
  @IsMongoId()
  locationId: string;
}
