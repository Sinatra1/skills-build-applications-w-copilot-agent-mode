import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function getItems(payload, key) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.[key])) return payload[key]
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export function useCollection(endpoint, key) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let isActive = true

    async function loadCollection() {
      try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}/`)
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        const payload = await response.json()
        if (isActive) setState({ items: getItems(payload, key), loading: false, error: '' })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown request error'
        if (isActive) setState({ items: [], loading: false, error: message })
      }
    }

    loadCollection()
    return () => { isActive = false }
  }, [endpoint, key])

  return state
}