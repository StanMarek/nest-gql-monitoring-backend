import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default registerAs(
  'database',
  (): MongooseModuleOptions => ({
    uri: process.env.DB_URL,
  }),
);
