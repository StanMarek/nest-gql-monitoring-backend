import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CLIENT_USER = 'CLIENT_USER',
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
  @Field()
  password: string;

  @Prop({ required: true, default: Role.CLIENT_USER })
  @Field(() => Role)
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
