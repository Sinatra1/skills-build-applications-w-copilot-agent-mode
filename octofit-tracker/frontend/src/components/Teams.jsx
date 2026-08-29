import CollectionStatus from './CollectionStatus.jsx'
import { useCollection } from './api.js'

export default function Teams() {
  const { items: teams, loading, error } = useCollection('teams', 'teams')

  return <section><div className="view-heading"><h1>Teams</h1><p>Shared momentum, measured together.</p></div><div className="collection-panel"><CollectionStatus loading={loading} error={error} isEmpty={!teams.length}><table className="table table-hover"><thead><tr><th>Team</th><th>Members</th><th className="text-end">Points</th></tr></thead><tbody>{teams.map((team) => <tr key={team._id || team.name}><td><div className="fw-bold">{team.name}</div><small className="text-secondary">{team.description}</small></td><td>{team.members?.map((member) => member.name || member).join(', ') || 'No members'}</td><td className="text-end">{team.totalPoints ?? 0}</td></tr>)}</tbody></table></CollectionStatus></div></section>
}