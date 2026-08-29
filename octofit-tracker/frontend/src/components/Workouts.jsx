import CollectionStatus from './CollectionStatus.jsx'
import { useCollection } from './api.js'

export default function Workouts() {
  const { items: workouts, loading, error } = useCollection('workouts', 'workouts')

  return <section><div className="view-heading"><h1>Workouts</h1><p>Suggestions ready for your next session.</p></div><div className="collection-panel"><CollectionStatus loading={loading} error={error} isEmpty={!workouts.length}><div className="workout-list">{workouts.map((workout) => <article className="workout-item" key={workout._id || workout.title}><span className="tag">{workout.difficulty}</span><h2>{workout.title}</h2><p className="workout-meta">{workout.category} · {workout.durationMinutes} min</p><p className="workout-meta mt-3">{workout.exercises?.join(' · ')}</p></article>)}</div></CollectionStatus></div></section>
}