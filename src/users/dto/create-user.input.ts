import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Role } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field({ nullable: true, defaultValue: Role.CLIENT_USER })
  role?: Role;
}
