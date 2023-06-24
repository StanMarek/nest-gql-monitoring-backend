import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
@ObjectType({
  implements: BaseSchema,
})
export class Location extends BaseSchema {
  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: false })
  @Field({ nullable: true })
  zone?: string;

  @Prop({ required: true })
  @Field()
  city: string;

  @Prop({ required: true })
  @Field()
  country: string;

  @Prop({ required: true })
  @Field()
  address: string;

  @Prop({ required: true })
  @Field()
  code: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User;
  // latitude: number;
  // longitude: number;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
