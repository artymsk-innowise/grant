import { Injectable } from "@nestjs/common";
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from "nest-winston";
import * as winston from "winston";

const formatter = [
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(({ message, level, timestamp }) => JSON.stringify({
    level,
    message,
    date: timestamp,
  }))
];

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor() {}

  createWinstonModuleOptions(): WinstonModuleOptions | Promise<WinstonModuleOptions> {
    return {
      level: 'info',
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          format: winston.format.combine(...formatter),
          level: 'error'
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'info.log',
          format: winston.format.combine(...formatter),
          level: 'info'
        }),
        new winston.transports.Console({
          format: winston.format.combine(...formatter),
          level: 'info'
        }),
      ]
    };
  }
}

