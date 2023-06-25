import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsSemVer } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { CreateDeviceInput } from './create-device.input';

@InputType()
export class UpdateDeviceInput extends OmitType(
  PartialType(CreateDeviceInput),
  ['version', 'serial'] as const,
) {
  @Field()
  @IsMongoId()
  id?: string;

  @IsOptional()
  @IsSemVer()
  @Field({ nullable: true })
  currentVersion?: string;

  @IsOptional()
  @IsSemVer()
  @Field({ nullable: true })
  latestVersion?: string;

  user?: User;
}
