import { Field, InputType } from '@nestjs/graphql';
import { IsSemVer, IsString } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @IsSemVer()
  @Field({ description: 'Default version of device' })
  version: string;

  @IsString()
  @Field({ description: 'Unique device identifier' })
  serial: string;
}
