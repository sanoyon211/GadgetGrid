import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGadget extends Document {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  stock: number;
  rating?: number;
  reviewsCount?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  specifications: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const GadgetSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    originalPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one image'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    }
  },
  {
    timestamps: true,
  }
);

const Gadget: Model<IGadget> = mongoose.models?.Gadget || mongoose.model<IGadget>('Gadget', GadgetSchema);

export default Gadget;
