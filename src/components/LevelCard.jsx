// src/components/LevelCard.jsx
// Difficulty selector button — BEGINNER / INTERMEDIATE / EXPERT

function LevelCard({ level, active, locked, xpRequired, onClick }) {
  return (
    <button
      className={`level-card ${active ? 'active' : ''} ${locked ? 'locked' : ''}`}
      onClick={onClick}
      title={locked ? `Unlock at ${xpRequired} XP` : ''}
    >
      <span className="lvl-name">{level}</span>
      {locked && <span>🔒</span>}
    </button>
  )
}

export default LevelCard
