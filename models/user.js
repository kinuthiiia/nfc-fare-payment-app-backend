import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const UserSchema = new Schema(
  {
    name: String,
    email: String,
    image: String,
    phoneNumber: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    accountBalance: { type: Number, default: 0 },
    smsNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: false },
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model("User", UserSchema);
