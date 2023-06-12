import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @IsString()
  @Field({ description: 'Default version of device' })
  version: string;

  @IsString()
  @Field({ description: 'Unique device identifier' })
  serial: string;
}
