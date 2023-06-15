import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsSemVer } from 'class-validator';
import { CreateDeviceInput } from './create-device.input';

@InputType()
export class UpdateDeviceInput extends OmitType(
  PartialType(CreateDeviceInput),
  ['version', 'serial'] as const,
) {
  @Field()
  @IsMongoId()
  id: string;

  @IsSemVer()
  @Field()
  currentVersion: string;

  @IsSemVer()
  @Field()
  latestVersion: string;
}
