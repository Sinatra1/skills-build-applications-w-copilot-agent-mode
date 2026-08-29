export default function CollectionStatus({ loading, error, isEmpty, children }) {
  if (loading) return <div className="loading-state">Loading data...</div>
  if (error) return <div className="error-state">Unable to load this view: {error}</div>
  if (isEmpty) return <div className="empty-state">No records yet.</div>
  return children
}