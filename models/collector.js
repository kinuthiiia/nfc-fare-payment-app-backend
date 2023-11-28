import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const CollectorSchema = new Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    accountBalance: Number,
  },
  {
    collection: "collectors",
  }
);

CollectorSchema.plugin(timestamps);

CollectorSchema.index({ createdAt: 1, updatedAt: 1 });

export const Collector = mongoose.model("Collector", CollectorSchema);
