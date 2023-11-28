import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const TagSchema = new Schema(
  {
    serial: String,
    cancelledAt: String,
  },
  {
    collection: "tags",
  }
);

TagSchema.plugin(timestamps);

TagSchema.index({ createdAt: 1, updatedAt: 1 });
export const Tag = mongoose.model("Tag", TagSchema);
