import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GqlConfigService } from "src/config/gql-config.service";
import { GrantsModule } from "./grants/grants.module";

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    }),
    GrantsModule,
  ],
  exports: [GraphQLModule],
})
export class CoreModule {}
