import CollectionStatus from './CollectionStatus.jsx'
import { useCollection } from './api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const { items: users, loading, error } = useCollection(usersEndpoint, 'users')

  return <section><div className="view-heading"><h1>Members</h1><p>People building their fitness streaks.</p></div><div className="collection-panel"><CollectionStatus loading={loading} error={error} isEmpty={!users.length}><table className="table table-hover"><thead><tr><th>Name</th><th>Email</th><th className="text-end">Points</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.email}><td className="fw-bold">{user.name}</td><td>{user.email}</td><td className="text-end">{user.totalPoints ?? 0}</td></tr>)}</tbody></table></CollectionStatus></div></section>
}