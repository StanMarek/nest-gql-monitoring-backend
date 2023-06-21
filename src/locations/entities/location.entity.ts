import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base.schema';

@Schema({ timestamps: true })
@ObjectType({
  implements: BaseSchema,
})
export class Location extends BaseSchema {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
