import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, ObjectId } from "mongoose";
import { Grant } from "./grant.schema";
import { User } from "./user.schema";

export type SavedGrantDocument = HydratedDocument<SavedGrant>;

@Schema({ collection: "saved_grant", toJSON: { virtuals: true } })
export class SavedGrant {
  _id: ObjectId;

  @Prop({ type: String, ref: User.name, required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: Grant.name, required: true })
  grant: Types.ObjectId;

  @Prop({ type: String, required: true })
  feedback: string;

  @Prop({ type: Date, required: true })
  matchDate: Date;

  @Prop({ type: String, required: true })
  status: string;
}

export const SavedGrantSchema = SchemaFactory.createForClass(SavedGrant);
