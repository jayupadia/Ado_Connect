import mongoose, { Schema, Document } from "mongoose";

// Comment Interface
interface IComment extends Document {
  userId: mongoose.Types.ObjectId; // User who commented
  postId: mongoose.Types.ObjectId; // Associated Post
  commentText: string; // Comment text
  replies: {
    userId: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
}

// Comment Schema
const CommentSchema = new Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    commentText: { type: String, required: true },
    replies: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
