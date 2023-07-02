import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import { DeviceConfig } from './device-config.schema';
import { Diagnostic, DiagnosticSchema } from './diagnostic.schema';
import { Report, ReportSchema } from './report.schema';

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

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  })
  @Field(() => User, { nullable: true, defaultValue: null })
  user?: User;

  @Prop({ type: DeviceConfig, required: true })
  @Field(() => DeviceConfig)
  config: DeviceConfig;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    default: null,
  })
  @Field(() => Location, { nullable: true, defaultValue: null })
  location?: Location;

  @Prop({ required: true, default: true })
  @Field({ defaultValue: true })
  isActive: boolean;

  @Prop({ required: true })
  publishTopic: string;

  @Prop({ required: false })
  previousConfigTimestamp: number;

  @Prop({ type: [DiagnosticSchema], default: [] })
  @Field(() => [Diagnostic], { defaultValue: [] })
  diagnostics: Diagnostic[];

  @Prop({ type: [ReportSchema], default: [] })
  @Field(() => [Report], { defaultValue: [] })
  reports: Report[];
}

export type DeviceDocument = Device & Document;
export const DeviceSchema = SchemaFactory.createForClass(Device);
