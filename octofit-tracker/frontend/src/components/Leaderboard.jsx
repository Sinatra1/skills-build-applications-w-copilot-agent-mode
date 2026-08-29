import CollectionStatus from './CollectionStatus.jsx'
import { useCollection } from './api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const { items: entries, loading, error } = useCollection(leaderboardEndpoint, 'leaderboard')

  return <section><div className="view-heading"><h1>Leaderboard</h1><p>This week's strongest streaks.</p></div><div className="collection-panel"><CollectionStatus loading={loading} error={error} isEmpty={!entries.length}><table className="table table-hover"><thead><tr><th>Rank</th><th>Member</th><th>Team</th><th className="text-end">Weekly points</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry._id}><td className="rank">#{entry.rank}</td><td className="fw-bold">{entry.user?.name || entry.user}</td><td>{entry.team?.name || entry.team}</td><td className="text-end">{entry.weeklyPoints}</td></tr>)}</tbody></table></CollectionStatus></div></section>
}