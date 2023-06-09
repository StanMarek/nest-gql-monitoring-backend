import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeviceInput {
  @Field({ description: 'Default version of device' })
  version: string;
}
