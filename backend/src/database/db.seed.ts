import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Grant, GrantDocument } from "../core/grants/entities/grant.schema";
import { HiddenGrant, HiddenGrantDocument } from "../core/grants/entities/hidden-grant.schema";
import { SavedGrant, SavedGrantDocument } from "../core/grants/entities/saved-grant.schema";
import { User, UserDocument } from "../core/grants/entities/user.schema";

@Injectable()
export class DBSeed implements OnModuleInit {
  constructor(
    @InjectModel(Grant.name) private readonly grantModel: Model<GrantDocument>,
    @InjectModel(HiddenGrant.name)
    private readonly hiddenGrantModel: Model<HiddenGrantDocument>,
    @InjectModel(SavedGrant.name)
    private readonly savedGrantModel: Model<SavedGrantDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    const grantCount = await this.grantModel.countDocuments();
    if (grantCount === 0) {
      await this.populateDatabase();
    }
  }

  private async populateDatabase() {
    const user = new this.userModel({
      id: "4e7b8472-8183-4888-bfe5-f56356c927c8",
      name: "John Doe",
    });
    await user.save();

    const grantsData = [
      {
        name: "Grant 1",
        amount: 10000,
        deadline: new Date("2024-11-31"),
        location: "Berlin",
        areas: ["Education", "Sport"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Grant 2",
        amount: 10000,
        deadline: new Date("2024-10-31"),
        location: "Manchester",
        areas: ["Education", "Sport"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Grant 3",
        amount: 1000,
        deadline: new Date("2024-11-31"),
        location: "Paris",
        areas: ["Education", "Art"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Grant 4",
        amount: 1000,
        deadline: new Date("2024-08-31"),
        location: "Warsaw",
        areas: ["Education", "Art"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Grant 5",
        amount: 1000,
        deadline: new Date("2024-06-31"),
        location: "Wilmington, Delaware",
        areas: ["Education", "Art"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Robinson Foundation Grant",
        amount: 1000,
        deadline: new Date("2024-01-01"),
        location: "Wilmington, Delaware",
        areas: ["Public Health", "Food"],
        foundation: "Robinson Foundation",
      },
      {
        name: "Looking Out Grant",
        amount: 100000,
        deadline: new Date("2024-06-31"),
        location: "Wilmington, Delaware",
        areas: ["Education", "Art"],
        foundation: "Looking Out Foundation",
      },
      {
        name: "Dribble Foundation Grant",
        amount: 75000,
        deadline: new Date("2024-06-31"),
        location: "Wilmington, Delaware",
        areas: ["Education", "Art"],
        foundation: "Dribble Foundation",
      },
      {
        name: "Grant 9",
        amount: 130000,
        deadline: new Date("2024-06-31"),
        location: "Wilmington, Delaware",
        areas: ["Education", "Art"],
        foundation: "New Casttle Foundation",
      },
      {
        name: "Grant 10",
        amount: 1000,
        deadline: new Date("2024-06-31"),
        location: "Wilmington, Delaware",
        areas: ["Education", "Art"],
        foundation: "New Casttle Foundation",
      },
    ];

    const grantsPromises = grantsData.map((grant) => {
      const newGrant = new this.grantModel(grant);
      return newGrant.save();
    });

    const grants = await Promise.all(grantsPromises);

    const hiddenGrant = new this.hiddenGrantModel({
      user: user.id,
      grant: grants[0]._id,
      feedback: "Not interested",
    });
    hiddenGrant.save();

    const savedGrant = new this.savedGrantModel({
      user: user.id,
      grant: grants[1]._id,
      feedback: "Looks promising",
      matchDate: new Date(),
      status: "Created",
    });
    savedGrant.save();

    const hiddenGrant2 = new this.hiddenGrantModel({
      user: user.id,
      grant: grants[2]._id,
      feedback: "Not interested",
    });
    hiddenGrant2.save();

    const savedGrant2 = new this.savedGrantModel({
      user: user.id,
      grant: grants[3]._id,
      feedback: "Looks promising",
      matchDate: new Date(),
      status: "Created",
    });
    savedGrant2.save();
  }
}
