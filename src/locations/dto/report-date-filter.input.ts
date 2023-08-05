import { Field, InputType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class ReportDateFilterInput {
  @IsDate()
  @Field()
  from: Date;

  @IsDate()
  @Field()
  to: Date;
}
