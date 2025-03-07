import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    imageUrl: string;
    caption?: string;
    likes: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String, required: true },
        caption: { type: String },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
