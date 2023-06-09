import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateDeviceInput } from './create-device.input';

@InputType()
export class UpdateDeviceInput extends OmitType(
  PartialType(CreateDeviceInput),
  ['version'] as const,
) {
  @Field()
  @IsMongoId()
  id: string;
}
