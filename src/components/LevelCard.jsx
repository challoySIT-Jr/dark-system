// src/components/LevelCard.jsx

// Component: LevelCard
// Purpose: Acts as a difficulty selector in the game system
// Levels include: BEGINNER, INTERMEDIATE, EXPERT
// This component controls progression and unlock logic visually

function LevelCard({ level, active, locked, xpRequired, onClick }) {

  return (
    <button

      // Dynamic class assignment:
      // - active: highlights selected level
      // - locked: disables access visually and functionally
      className={`level-card ${active ? 'active' : ''} ${locked ? 'locked' : ''}`}

      // Click event handler passed from parent component
      onClick={onClick}

      // Tooltip shows unlock requirement if level is locked
      title={locked ? `Unlock at ${xpRequired} XP` : ''}

    >
      {/* Level name display (e.g., BEGINNER, INTERMEDIATE, EXPERT) */}
      <span className="lvl-name">{level}</span>

      {/* Lock icon shown only when level is not yet unlocked */}
      {locked && <span>🔒</span>}

    </button>
  )
}

// Export for reuse in Dashboard or selection screens
export default LevelCard
