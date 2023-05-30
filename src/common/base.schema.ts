import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InterfaceType()
export abstract class BaseSchema {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
