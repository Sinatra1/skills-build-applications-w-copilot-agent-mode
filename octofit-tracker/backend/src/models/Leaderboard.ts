import { InferSchemaType, model, models, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    weeklyPoints: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;
export default models.Leaderboard || model<Leaderboard>('Leaderboard', leaderboardSchema);