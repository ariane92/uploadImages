import mongoose, { Schema, Document } from 'mongoose';

export interface IPostSchema extends Document {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPostSchema>('Post', PostSchema);
