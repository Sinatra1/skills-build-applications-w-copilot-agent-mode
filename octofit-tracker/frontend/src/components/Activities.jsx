import CollectionStatus from './CollectionStatus.jsx'
import { useCollection } from './api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const { items: activities, loading, error } = useCollection(activitiesEndpoint, 'activities')

  return <section><div className="view-heading"><h1>Activities</h1><p>Recent sessions from across OctoFit.</p></div><div className="collection-panel"><CollectionStatus loading={loading} error={error} isEmpty={!activities.length}><table className="table table-hover"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th className="text-end">Calories</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td className="fw-bold">{activity.type}</td><td>{activity.user?.name || activity.user || 'Unknown'}</td><td>{activity.durationMinutes} min{activity.distanceKm ? ` · ${activity.distanceKm} km` : ''}</td><td className="text-end">{activity.calories}</td></tr>)}</tbody></table></CollectionStatus></div></section>
}