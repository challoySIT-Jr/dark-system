// src/pages/HistoryDetailPage.jsx
// Route: /history/:id   ← NESTED DYNAMIC ROUTE
// Full detail of one past quest entry + protocol applied

import { useParams, useNavigate } from 'react-router-dom'
import ProtocolBox from '../components/ProtocolBox'
import { RECOVERY_PROTOCOL } from '../data/gameData.jsx'

function HistoryDetailPage({ history }) {
  const { id }   = useParams()
  const navigate = useNavigate()
  const entry    = history.find(h => String(h.id) === String(id))

  if (!entry) {
    return (
      <div className="system-content animate-fade">
        <p style={{ color: '#ff6464', marginBottom: 16 }}>Record not found.</p>
        <button className="system-btn" onClick={() => navigate('/history')}>BACK</button>
      </div>
    )
  }

  const protocol = RECOVERY_PROTOCOL[entry.level] || RECOVERY_PROTOCOL.BEGINNER

  return (
    <div className="system-content animate-fade">
      <h2 className="section-title">QUEST RECORD</h2>

      {/* Entry summary */}
      <div className="detail-card">
        <h3>{entry.workout}</h3>
        <p className="detail-meta">{entry.date} — {entry.day}: {entry.focus}</p>
        <p className="detail-meta">Difficulty: {entry.level}</p>
        <p className="detail-xp">+{entry.xpEarned} XP</p>
      </div>

      {/* Protocol used */}
      <h3 className="recovery-title">PROTOCOL APPLIED</h3>
      <ProtocolBox icon="⚡" header="NUTRITION"  text={protocol.nutrition}  />
      <ProtocolBox icon="💧" header="HYDRATION"  text={protocol.hydration}  />
      <ProtocolBox icon="🧘" header="RECOVERY"   text={protocol.recovery}   />
      <ProtocolBox icon="😴" header="REST"       text={protocol.rest}       />

      <button className="system-btn secondary" style={{ marginTop: 18 }} onClick={() => navigate('/history')}>
        BACK TO LOG
      </button>
    </div>
  )
}

export default HistoryDetailPage
