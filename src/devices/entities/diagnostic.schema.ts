import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Heartbeat } from 'src/common/types/message-type';

@Schema({ timestamps: true })
@ObjectType()
export class Diagnostic implements Heartbeat {
  @Field()
  @Prop({ required: true })
  bssid: string;

  @Field(() => Int)
  @Prop({ required: true })
  rssi: number;

  @Field(() => Int)
  @Prop({ required: true })
  uptime: number;

  @Field(() => Int)
  @Prop({ required: true })
  conUptime: number;

  @Field(() => Int)
  @Prop({ required: true })
  configId: number;

  @Field(() => Int)
  @Prop({ required: true })
  errorFlag: number;

  @Field()
  @Prop({ required: true })
  fw: string;

  @Field(() => Int)
  @Prop({ required: true })
  memFree: number;

  @Field(() => Int)
  @Prop({ required: true })
  powerMode: number;

  @Field(() => Int)
  @Prop({ required: true })
  temperature: number;

  @Field(() => Date)
  @Prop({ required: true })
  date: Date;
}

export const DiagnosticSchema = SchemaFactory.createForClass(Diagnostic);
