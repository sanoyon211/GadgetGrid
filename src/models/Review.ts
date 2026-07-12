import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  gadget: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gadget: {
      type: Schema.Types.ObjectId,
      ref: 'Gadget',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from reviewing the same gadget multiple times
ReviewSchema.index({ user: 1, gadget: 1 }, { unique: true });

const Review: Model<IReview> = mongoose.models?.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
