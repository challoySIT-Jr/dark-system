// src/pages/HistoryPage.jsx
// Route: /history
// Quest log — list of all completed workouts, click any to view detail

import { useNavigate } from 'react-router-dom'
import HistoryItem from '../components/HistoryItem'

function HistoryPage({ history }) {
  const navigate = useNavigate()

  return (
    <div className="system-content animate-fade">
      <h2 className="section-title">QUEST LOG</h2>

      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty-msg">NO RECORDS FOUND</p>
        ) : (
          history.map(entry => (
            <HistoryItem
              key={entry.id}
              entry={entry}
              onClick={() => navigate(`/history/${entry.id}`)}
            />
          ))
        )}
      </div>

      <button className="system-btn secondary" onClick={() => navigate('/dashboard')}>
        BACK
      </button>
    </div>
  )
}

export default HistoryPage
