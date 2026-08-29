import { InferSchemaType, model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export default models.User || model<User>('User', userSchema);