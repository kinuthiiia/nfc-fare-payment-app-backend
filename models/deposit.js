import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const DepositSchema = new Schema(
  {
    code: String,
    amount: Number,
    timestamp: String,
    phoneNumber: String,
    account: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "deposits",
  }
);

DepositSchema.plugin(timestamps);

DepositSchema.index({ createdAt: 1, updatedAt: 1 });

export const Deposit = mongoose.model("Deposit", DepositSchema);
