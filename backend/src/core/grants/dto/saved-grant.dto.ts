import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { GrantDTO } from "./grant.dto";

@ObjectType()
export class SavedGrantDTO {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => GrantDTO)
  grant?: GrantDTO;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  matchDate: Date;

  @Field(() => String)
  feedback: string;
}
