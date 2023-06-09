import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateLocationInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field({ nullable: true })
  zone?: string;

  @IsString()
  @Field()
  city: string;

  @IsString()
  @Field()
  country: string;

  @IsString()
  @Field()
  address: string;

  @IsString()
  @Field()
  code: string;

  user: string | Types.ObjectId;
}
