import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class GrantDTO {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Date)
  deadline: Date;

  @Field(() => String)
  location: string;

  @Field(() => [String])
  areas: string[];

  @Field(() => String)
  foundation: string;
}
