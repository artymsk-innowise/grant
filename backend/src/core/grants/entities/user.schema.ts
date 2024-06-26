import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "user", toJSON: { virtuals: true } })
export class User {
  @Prop({ type: String, required: true })
  id: String;

  @Prop({ type: String, required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
