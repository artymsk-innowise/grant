import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { Logger } from "winston";
import { WinstonConfigService } from "./config/winston-config.service";
import { CoreModule } from "./core/core.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService 
    }),
    CoreModule,
  ],
  providers: [Logger]
})
export class AppModule {}
