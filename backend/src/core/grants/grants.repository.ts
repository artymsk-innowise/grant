import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Grant, GrantDocument } from "./entities/grant.schema";
import { HiddenGrant, HiddenGrantDocument } from "./entities/hidden-grant.schema";
import { SavedGrant, SavedGrantDocument } from "./entities/saved-grant.schema";
import { User, UserDocument } from "./entities/user.schema";
import { SavedGrantDTO } from "./dto/saved-grant.dto";
import { GrantDTO } from "./dto/grant.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class GrantRepository {
  @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger;

  constructor(
    @InjectModel(Grant.name) private readonly grantModel: Model<GrantDocument>,
    @InjectModel(HiddenGrant.name)
    private readonly hiddenGrantModel: Model<HiddenGrantDocument>,
    @InjectModel(SavedGrant.name)
    private readonly savedGrantModel: Model<SavedGrantDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getSavedGrants(userId: string): Promise<SavedGrantDTO[]> {
    this.logger.info(`getSavedGrants repository method invoked with arguments: userId - ${userId}`);
    const savedGrants = await this.savedGrantModel.find({ user: userId }).populate<{ grant: Grant }>("grant").exec();
    this.logger.info(`Result of db call - ${JSON.stringify(savedGrants)}`);
    return savedGrants;
  }

  async getGrantMatches(userId: string): Promise<GrantDTO[]> {
    this.logger.info(`getSavedGrants repository method invoked with arguments: userId - ${userId}`);

    const grants = await this.grantModel
      .aggregate([
        {
          $lookup: {
            from: "saved_grant",
            localField: "_id",
            foreignField: "grant",
            as: "saved",
          },
        },
        {
          $lookup: {
            from: "hidden_grant",
            localField: "_id",
            foreignField: "grant",
            as: "hidden",
          },
        },
        {
          $match: {
            $and: [{ "saved.user": { $ne: userId } }, { "hidden.user": { $ne: userId } }],
          },
        },
      ])
      .exec();

    this.logger.info(`Result of db call - ${JSON.stringify(grants)}`);

    return grants;
  }

  async saveGrant(userId: string, grantId: string, feedback: string): Promise<SavedGrant> {
    this.logger.info(`saveGrant repository method invoked with arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);

    if (!Types.ObjectId.isValid(grantId)) {
      throw new Error("Invalid grantId");
    }

    const doesGrantExist = await this.grantModel.findOne({ _id: grantId }).exec();
    this.logger.info(`does grant exist - ${Boolean(doesGrantExist)}`);

    if (!doesGrantExist) throw new Error("Grant with specified id does not exist");

    const doesSavedGrantExist = await this.savedGrantModel
      .findOne({ user: userId, grant: new Types.ObjectId(grantId) })
      .exec();

    this.logger.info(`does saved grant exist - ${Boolean(doesSavedGrantExist)}`);
    if (doesSavedGrantExist) throw new Error("You already saved this Grant");

    const savedGrant = new this.savedGrantModel({
      user: userId,
      grant: new Types.ObjectId(grantId),
      feedback,
      matchDate: new Date(),
      status: "Created",
    });
    this.logger.info(`Saved grant - ${JSON.stringify(savedGrant)}`);

    return savedGrant.save();
  }

  async hideGrant(userId: string, grantId: string, feedback: string): Promise<HiddenGrant> {
    this.logger.info(`saveGrant repository method invoked with arguments: userId - ${userId}, grantId - ${grantId}, feedback - ${feedback}`);

    if (!Types.ObjectId.isValid(grantId)) {
      throw new Error("Invalid grantId");
    }

    const doesGrantExist = await this.grantModel.findOne({ _id: grantId }).exec();
    this.logger.info(`does grant exist - ${Boolean(doesGrantExist)}`);
    if (!doesGrantExist) throw new Error("Grant with specified id does not exist");

    const isGrantHidden = await this.hiddenGrantModel
      .findOne({ user: userId, grant: new Types.ObjectId(grantId) })
      .exec();

    this.logger.info(`is grant hidden - ${Boolean(isGrantHidden)}`);
    if (isGrantHidden) throw new Error("You've already hidden this Grant");

    const hiddenGrant = new this.hiddenGrantModel({
      user: userId,
      grant: new Types.ObjectId(grantId),
      feedback,
    });
    this.logger.info(`hidden grant - ${JSON.stringify(hiddenGrant)}`);
    return hiddenGrant.save();
  }
}
