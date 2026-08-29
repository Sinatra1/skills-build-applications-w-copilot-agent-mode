import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, leo, priya] = await User.create([
      { name: 'Maya Chen', email: 'maya@example.com', totalPoints: 1280 },
      { name: 'Leo Martin', email: 'leo@example.com', totalPoints: 1110 },
      { name: 'Priya Shah', email: 'priya@example.com', totalPoints: 980 },
    ]);

    const team = await Team.create({
      name: 'Early Risers',
      description: 'A team that starts each day with movement.',
      members: [maya._id, leo._id, priya._id],
      totalPoints: 3370,
    });

    await Activity.create([
      { user: maya._id, type: 'Run', durationMinutes: 42, distanceKm: 7.2, calories: 510, completedAt: new Date('2026-08-27T06:30:00Z') },
      { user: leo._id, type: 'Cycling', durationMinutes: 55, distanceKm: 18.4, calories: 620, completedAt: new Date('2026-08-27T07:00:00Z') },
      { user: priya._id, type: 'Strength training', durationMinutes: 38, calories: 340, completedAt: new Date('2026-08-28T06:45:00Z') },
    ]);

    await Leaderboard.create([
      { user: maya._id, team: team._id, rank: 1, weeklyPoints: 480 },
      { user: leo._id, team: team._id, rank: 2, weeklyPoints: 435 },
      { user: priya._id, team: team._id, rank: 3, weeklyPoints: 390 },
    ]);

    await Workout.create([
      { title: 'Sunrise Strength', category: 'Strength', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Goblet squats', 'Push-ups', 'Plank'] },
      { title: 'Park Interval Run', category: 'Cardio', difficulty: 'Beginner', durationMinutes: 25, exercises: ['Warm-up walk', 'Run intervals', 'Cool-down walk'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
