import mongoose, { Schema, model, models } from "mongoose";

interface IProduct {
  title: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  owner: mongoose.Types.ObjectId; // Reference to the User who added the product
  createdAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
