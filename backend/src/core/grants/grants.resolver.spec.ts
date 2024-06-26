import { Test, TestingModule } from "@nestjs/testing";
import { GrantsResolver } from "./grants.resolver";
import { GrantService } from "./grants.service";
import { SavedGrantDTO } from "./dto/saved-grant.dto";
import { GrantDTO } from "./dto/grant.dto";
import { Types } from "mongoose";
import { SavedGrant } from "./entities/saved-grant.schema";
import { HiddenGrant } from "./entities/hidden-grant.schema";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

describe("GrantsResolver", () => {
  let resolver: GrantsResolver;
  let service: GrantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantsResolver,
        {
          provide: GrantService,
          useValue: {
            getSavedGrants: jest.fn(),
            getGrantMatches: jest.fn(),
            saveGrant: jest.fn(),
            hideGrant: jest.fn(),
          },
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockLogger,
        },
      ],
    }).compile();

    resolver = module.get<GrantsResolver>(GrantsResolver);
    service = module.get<GrantService>(GrantService);
  });

  describe("savedGrants", () => {
    it("should return an array of SavedGrantDTO", async () => {
      const userId = "userId1";
      const savedGrants: SavedGrantDTO[] = [
        {
          _id: new Types.ObjectId() as any,
          grant: {
            _id: new Types.ObjectId() as any,
            name: "Grant 1",
            amount: 1000,
            deadline: new Date(),
            location: "Location 1",
            areas: ["Area 1", "Area 2"],
            foundation: "Foundation 1",
          },
          status: "Applied",
          matchDate: new Date(),
          feedback: "Great grant!",
        },
      ];
      jest.spyOn(service, "getSavedGrants").mockResolvedValue(savedGrants);

      expect(await resolver.savedGrants(userId)).toBe(savedGrants);
    });
  });

  describe("grantsMatches", () => {
    it("should return an array of GrantDTO", async () => {
      const userId = "userId1";
      const grantsMatches: GrantDTO[] = [
        {
          _id: new Types.ObjectId() as any,
          name: "Grant 1",
          amount: 1000,
          deadline: new Date(),
          location: "Location 1",
          areas: ["Area 1", "Area 2"],
          foundation: "Foundation 1",
        },
      ];
      jest.spyOn(service, "getGrantMatches").mockResolvedValue(grantsMatches);

      expect(await resolver.grantsMatches(userId)).toBe(grantsMatches);
    });
  });

  describe("saveGrant mutation", () => {
    it("should return a SavedGrantDTO", async () => {
      const userId = "userId1";
      const grantId = "grantId1";
      const feedback = "Great grant!";

      const savedGrant: SavedGrant = {
        _id: new Types.ObjectId() as any,
        user: "1",
        grant: new Types.ObjectId() as any,
        status: "Accepted",
        matchDate: new Date(),
        feedback,
      };

      jest.spyOn(service, "saveGrant").mockResolvedValue(savedGrant);

      const result = await resolver.saveGrant(userId, grantId, feedback);
      expect(result).toBe(savedGrant);
    });
  });

  describe("hideGrant mutation", () => {
    it("should return a HiddenGrant", async () => {
      const userId = "userId1";
      const grantId = "grantId1";
      const feedback = "Not interested";

      const hiddenGrant: HiddenGrant = {
        _id: new Types.ObjectId() as any,
        user: "1",
        grant: new Types.ObjectId() as any,
        feedback,
      };

      jest.spyOn(service, "hideGrant").mockResolvedValue(hiddenGrant);

      const result = await resolver.hideGrant(userId, grantId, feedback);
      expect(result).toBe(hiddenGrant);
    });
  });
});
