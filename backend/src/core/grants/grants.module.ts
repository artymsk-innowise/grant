import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GrantsResolver } from "./grants.resolver";
import { GrantService } from "./grants.service";
import { GrantRepository } from "./grants.repository";
import { Grant, GrantSchema } from "../grants/entities/grant.schema";
import { User, UserSchema } from "../grants/entities/user.schema";
import { SavedGrant, SavedGrantSchema } from "../grants/entities/saved-grant.schema";
import { HiddenGrant, HiddenGrantSchema } from "../grants/entities/hidden-grant.schema";
import { DatabaseModule } from "../../database/database.module";
import { DBSeed } from "../../database/db.seed";

@Module({
  imports: [
    DatabaseModule, 
    MongooseModule.forFeature([
      { name: Grant.name, schema: GrantSchema },
      { name: User.name, schema: UserSchema },
      { name: SavedGrant.name, schema: SavedGrantSchema },
      { name: HiddenGrant.name, schema: HiddenGrantSchema },
    ]),
  ],
  providers: [DBSeed, GrantsResolver, GrantService, GrantRepository],
})
export class GrantsModule {}
