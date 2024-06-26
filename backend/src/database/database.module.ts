import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseConfigService } from "../config/mongoose-config.service";

@Module({
  imports: [
      MongooseModule.forRootAsync({
          useClass: DatabaseConfigService,
      }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
