import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, ObjectId } from "mongoose";

export type GrantDocument = HydratedDocument<Grant>;

@Schema({ collection: "grant", toJSON: { virtuals: true } })
export class Grant {
  _id: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  deadline: Date;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: [String], required: true })
  areas: string[];

  @Prop({ type: String, required: true })
  foundation: string;
}

export const GrantSchema = SchemaFactory.createForClass(Grant);
