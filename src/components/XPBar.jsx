// src/components/XPBar.jsx
// XP progress bar — mirrors the original xp-section from App.css

import { LEVEL_THRESHOLDS } from '../data/gameData.jsx'

function XPBar({ xp, currentLevel }) {
  const threshold = LEVEL_THRESHOLDS[currentLevel]
  const maxXP     = threshold.maxXP === Infinity ? threshold.minXP + 800 : threshold.maxXP
  const progress  = Math.min(((xp - threshold.minXP) / (maxXP - threshold.minXP)) * 100, 100)
  const remaining = threshold.maxXP === Infinity ? 0 : threshold.maxXP - xp

  return (
    <div className="xp-section">
      <div className="xp-header">
        <span className="xp-label">EXPERIENCE POINTS</span>
        <span className="xp-value">{xp} / {threshold.maxXP === Infinity ? 'MAX' : threshold.maxXP}</span>
      </div>
      <div className="xp-bar-bg">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="xp-info">
        {currentLevel === 'EXPERT'
          ? 'MAXIMUM LEVEL REACHED'
          : `${remaining} XP until next level`}
      </p>
    </div>
  )
}

export default XPBar
