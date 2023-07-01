import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

export enum Role {
  CLIENT_USER = 'CLIENT_USER',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role' });
@Schema({ timestamps: true })
@ObjectType({
  implements: BaseSchema,
})
export class User extends BaseSchema {
  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true, unique: true })
  @Field()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: Role.CLIENT_USER })
  @Field(() => Role)
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
