// models/Purchase.ts
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const PurchaseSchema = new Schema({
  user: { type: String, required: true }, // user ID as string
  products: { type: [ProductSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "completed" },
  purchasedAt: { type: Date, default: Date.now },
});

export const Purchase = models.Purchase || model("Purchase", PurchaseSchema);
