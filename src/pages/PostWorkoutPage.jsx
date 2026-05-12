// src/pages/PostWorkoutPage.jsx
// Route: /post-workout
// Quest complete — XP gained, level up, recovery protocol, bonus quest

import { useNavigate, useLocation } from 'react-router-dom'
import ProtocolBox from '../components/ProtocolBox'
import { RECOVERY_PROTOCOL } from '../data/gameData.jsx'

function PostWorkoutPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    xpEarned  = 0,
    leveledUp = false,
    newLevel  = 'BEGINNER',
    quest     = '',
    level     = 'BEGINNER',
  } = location.state || {}

  const protocol = RECOVERY_PROTOCOL[level] || RECOVERY_PROTOCOL.BEGINNER

  return (
    <div className="system-content animate-fade">

      <div className="success-banner">QUEST COMPLETED</div>

      {/* XP gained */}
      <div className="xp-gained-box">
        <span className="xp-gained-label">EXPERIENCE GAINED</span>
        <span className="xp-gained-value">+{xpEarned} XP</span>
      </div>

      {/* Level up banner */}
      {leveledUp && (
        <div className="level-up-banner">
          <span className="levelup-text">🎖️ LEVEL UP! 🎖️</span>
          <span className="new-level">{newLevel} UNLOCKED</span>
        </div>
      )}

      {/* Recovery protocol */}
      <div className="recovery-section">
        <h3 className="recovery-title">POST-QUEST PROTOCOL</h3>
        <ProtocolBox icon="⚡" header="NUTRITION"  text={protocol.nutrition}  />
        <ProtocolBox icon="💧" header="HYDRATION"  text={protocol.hydration}  />
        <ProtocolBox icon="🧘" header="RECOVERY"   text={protocol.recovery}   />
        <ProtocolBox icon="😴" header="REST"       text={protocol.rest}       />

        {quest && (
          <div className="bonus-quest-box">
            <h4>BONUS DAILY QUEST</h4>
            <p className="quest-text">{quest}</p>
          </div>
        )}
      </div>

      <button className="system-btn glow" onClick={() => navigate('/dashboard')}>
        ARISE
      </button>
    </div>
  )
}

export default PostWorkoutPage
