import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Authorization {
  @Field()
  token: string;

  @Field(() => Int)
  expiresIn: number;
}
