import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { GrantDTO } from "./grant.dto";

@ObjectType()
export class HiddenGrantDTO {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => GrantDTO)
  grant?: GrantDTO;

  @Field(() => String)
  feedback: string;
}
