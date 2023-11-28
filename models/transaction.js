import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const { Schema } = mongoose;

export const TransactionSchema = new Schema(
  {
    amount: Number,
    tag: { type: Schema.Types.ObjectId, ref: "Tag" },
    collector: { type: Schema.Types.ObjectId, ref: "Collector" },
  },
  {
    collection: "transactions",
  }
);

TransactionSchema.plugin(timestamps);

TransactionSchema.index({ createdAt: 1, updatedAt: 1 });

export const Transaction = mongoose.model("Transaction", TransactionSchema);
