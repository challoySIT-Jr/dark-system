// src/components/XPBar.jsx

// Component: XPBar
// Purpose: Displays the player's experience progression visually
// This acts as a gamified progress tracking system similar to RPG leveling bars
// It reflects real-time XP updates and level progression thresholds

import { LEVEL_THRESHOLDS } from '../data/gameData.jsx'

function XPBar({ xp, currentLevel }) {

  // Get XP range for current level (min and max XP boundaries)
  const threshold = LEVEL_THRESHOLDS[currentLevel]

  // Handle case where EXPERT level has no upper limit (Infinity)
  const maxXP =
    threshold.maxXP === Infinity
      ? threshold.minXP + 800
      : threshold.maxXP

  // Calculate percentage progress within current level range
  const progress = Math.min(
    ((xp - threshold.minXP) / (maxXP - threshold.minXP)) * 100,
    100
  )

  // Remaining XP until next level (0 if already at max level)
  const remaining =
    threshold.maxXP === Infinity
      ? 0
      : threshold.maxXP - xp

  return (
    <div className="xp-section">

      {/* XP header displaying current XP status */}
      <div className="xp-header">
        <span className="xp-label">EXPERIENCE POINTS</span>

        {/* Shows current XP vs level cap */}
        <span className="xp-value">
          {xp} / {threshold.maxXP === Infinity ? 'MAX' : threshold.maxXP}
        </span>
      </div>

      {/* Visual XP progress bar */}
      <div className="xp-bar-bg">
        <div
          className="xp-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress message or max-level status */}
      <p className="xp-info">
        {currentLevel === 'EXPERT'
          ? 'MAXIMUM LEVEL REACHED'
          : `${remaining} XP until next level`}
      </p>

    </div>
  )
}

// Export component for reuse in dashboard and status screens
export default XPBar
