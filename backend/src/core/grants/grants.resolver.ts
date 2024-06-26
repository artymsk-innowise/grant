import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GrantService } from "./grants.service";
import { GrantDTO } from "./dto/grant.dto";
import { SavedGrantDTO } from "./dto/saved-grant.dto";
import { SavedGrant } from "./entities/saved-grant.schema";
import { HiddenGrant } from "./entities/hidden-grant.schema";
import { HiddenGrantDTO } from "./dto/hidden-grant.dto";
import { Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Resolver()
export class GrantsResolver {
  @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger;

  constructor(private readonly grantService: GrantService) {}

  @Query(() => [SavedGrantDTO], { name: "savedGrants" })
  async savedGrants(@Args({ name: "userId", type: () => String }) userId: string): Promise<SavedGrantDTO[]> {
    this.logger.info(`SavedGrants query invoked with following arguments: userId - ${userId}`);

    return this.grantService.getSavedGrants(userId);
  }

  @Query(() => [GrantDTO], { name: "grantsMatches" })
  async grantsMatches(@Args({ name: "userId", type: () => String }) userId: string): Promise<GrantDTO[]> {
    this.logger.info(`GrantsMatches query invoked with following arguments: userId - ${userId}`);

    return this.grantService.getGrantMatches(userId);
  }

  @Mutation(() => SavedGrantDTO)
  async saveGrant(
    @Args("userId", { type: () => String }) userId: string,
    @Args("grantId", { type: () => String }) grantId: string,
    @Args("feedback", { type: () => String }) feedback: string,
  ): Promise<SavedGrant> {
    this.logger.info(`SaveGrant mutation invoked with following arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);

    return this.grantService.saveGrant(userId, grantId, feedback);
  }

  @Mutation(() => HiddenGrantDTO)
  async hideGrant(
    @Args("userId", { type: () => String }) userId: string,
    @Args("grantId", { type: () => String }) grantId: string,
    @Args("feedback", { type: () => String }) feedback: string,
  ): Promise<HiddenGrant> {
    this.logger.info(`HideGrant mutation invoked with following arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);

    return this.grantService.hideGrant(userId, grantId, feedback);
  }
}
