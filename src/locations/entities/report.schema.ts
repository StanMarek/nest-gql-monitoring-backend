import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ReportEnvironmentMessage,
  ReportLightMessage,
  ReportMessage,
  ReportMicMessage,
  ReportPirsensorMessage,
} from 'src/common/types/message-type';

@ObjectType()
export class ReportEnvironment implements ReportEnvironmentMessage {
  @Field(() => Int)
  h: number;

  @Field(() => Int)
  t: number;

  @Field(() => Int)
  hAvg: number;

  @Field(() => Int)
  tAvg: number;

  @Field(() => Int)
  hMax: number;

  @Field(() => Int)
  tMax: number;

  @Field(() => Int)
  hMin: number;

  @Field(() => Int)
  tMin: number;
}

@ObjectType()
export class ReportMic implements ReportMicMessage {
  @Field(() => Int)
  alarm1Cnt: number;

  @Field(() => Int)
  alarm2Cnt: number;

  @Field(() => Int)
  alarmAl1Cnt: number;

  @Field(() => Int)
  alarmAl2Cnt: number;

  @Field(() => Int)
  avgDb: number;

  @Field(() => Int)
  maxDb: number;

  @Field(() => Int)
  micTamer: number;

  @Field(() => Int)
  noiseLvlDb: number;
}

@ObjectType()
export class ReportPirsensor implements ReportPirsensorMessage {
  @Field(() => Int)
  cnt: number;

  @Field(() => Int)
  time: number;
}

@ObjectType()
export class ReportLight implements ReportLightMessage {
  @Field(() => Int)
  light: number;
}

@Schema({ timestamps: true })
@ObjectType()
export class Report implements ReportMessage {
  @Prop({ type: ReportEnvironment, required: true })
  @Field(() => ReportEnvironment)
  environment: ReportEnvironment;

  @Prop({ type: ReportMic, required: true })
  @Field(() => ReportMic)
  mic: ReportMic;

  @Prop({ type: ReportPirsensor, required: true })
  @Field(() => ReportPirsensor)
  pirsensor: ReportPirsensor;

  @Prop({ type: ReportLight, required: true })
  @Field(() => ReportLight)
  lightsensor: ReportLight;

  @Prop({ type: Date, required: true })
  @Field(() => Date)
  date: Date;

  @Prop({ required: true })
  @Field()
  device: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
