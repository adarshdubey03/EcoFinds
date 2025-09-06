import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPurchase extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  total: number;
  purchasedAt: Date;
}

const PurchaseSchema: Schema<IPurchase> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Purchase: Model<IPurchase> =
  mongoose.models.Purchase || mongoose.model<IPurchase>("Purchase", PurchaseSchema);
