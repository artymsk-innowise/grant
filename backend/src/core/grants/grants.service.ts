import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { GrantRepository } from "./grants.repository";

@Injectable()
export class GrantService {
  @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger;

  constructor(private readonly grantRepository: GrantRepository) {}

  async getSavedGrants(userId: string) {
    this.logger.info(`getSavedGrants service method invoked with arguments: userId - ${userId}`);

    const savedGrants = await this.grantRepository.getSavedGrants(userId);

    this.logger.info(`Result of repository call - ${JSON.stringify(savedGrants)}`);

    return savedGrants;
  }

  async getGrantMatches(userId: string) {
    this.logger.info(`getGrantMatches service method invoked with arguments: userId - ${userId}`);

    const grantMatches = await this.grantRepository.getGrantMatches(userId);

    this.logger.info(`Result of repository call - ${JSON.stringify(grantMatches)}`);

    return grantMatches;
  }

  async saveGrant(userId: string, grantId: string, feedback: string) {
    this.logger.info(`saveGrant service method invoked with arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);

    const saveGrant = await this.grantRepository.saveGrant(userId, grantId, feedback);

    this.logger.info(`Result of repository call - ${JSON.stringify(saveGrant)}`);
    
    return saveGrant;
  }

  async hideGrant(userId: string, grantId: string, feedback: string) {
    this.logger.info(`hideGrant service method invoked with arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);
    
    const hideGrant = await this.grantRepository.hideGrant(userId, grantId, feedback);

    this.logger.info(`Result of repository call - ${JSON.stringify(hideGrant)}`);

    return hideGrant;
  }
}
