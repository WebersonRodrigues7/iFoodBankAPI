import { Global, Module } from '@nestjs/common';
import { db } from './database';

@Global()
@Module({
  providers: [
    {
      provide: 'Drizzle',
      useValue: db,
    },
  ],
  exports: ['Drizzle'],
})
export class DatabaseModule {}
