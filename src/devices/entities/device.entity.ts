import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
@ObjectType({
  implements: BaseSchema,
})
export class Device extends BaseSchema {
  @Prop({ required: true })
  @Field()
  currentVersion: string;

  @Prop({ required: true })
  @Field()
  latestVersion: string;

  @Prop({ required: true, unique: true, index: true })
  @Field()
  serial: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  @Field({ nullable: true })
  user?: User;

  // @Prop({ required: true, default: DefaultConfig})
  // @Field()
  // config: Config;

  // @Prop({ required: false })
  // @Field()
  // location?: Location;

  @Prop({ required: true, default: true })
  @Field()
  isActive: boolean;

  @Prop({ required: true })
  @Field()
  publishTopic: string;
}

export type DeviceDocument = Device & Document;
export const DeviceSchema = SchemaFactory.createForClass(Device);
