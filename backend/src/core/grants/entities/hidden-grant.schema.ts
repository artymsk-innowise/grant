import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, ObjectId } from "mongoose";
import { User } from "./user.schema";
import { Grant } from "./grant.schema";

export type HiddenGrantDocument = HydratedDocument<HiddenGrant>;

@Schema({ collection: "hidden_grant", toJSON: { virtuals: true } })
export class HiddenGrant {
  _id: ObjectId;

  @Prop({ type: String, ref: User.name, required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: Grant.name, required: true })
  grant: Types.ObjectId;

  @Prop({ type: String, required: true })
  feedback: string;
}

export const HiddenGrantSchema = SchemaFactory.createForClass(HiddenGrant);
