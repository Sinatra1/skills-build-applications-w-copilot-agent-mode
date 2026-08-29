import express from 'express';
import './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ service: 'OctoFit Tracker API', baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json({ users: await User.find().sort({ name: 1 }).lean() });
});

app.get('/api/teams/', async (_request, response) => {
  response.json({ teams: await Team.find().populate('members', 'name email').lean() });
});

app.get('/api/activities/', async (_request, response) => {
  response.json({ activities: await Activity.find().populate('user', 'name').sort({ completedAt: -1 }).lean() });
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json({ leaderboard: await Leaderboard.find().populate('user', 'name').populate('team', 'name').sort({ rank: 1 }).lean() });
});

app.get('/api/workouts/', async (_request, response) => {
  response.json({ workouts: await Workout.find().sort({ title: 1 }).lean() });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});