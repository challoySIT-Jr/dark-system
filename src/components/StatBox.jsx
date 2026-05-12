// src/components/StatBox.jsx

// Component: StatBox
// Purpose: Displays a single character stat tile in the UI
// Examples of stats: STR (Strength), AGI (Agility), VIT (Vitality)
// This supports a gamified fitness system where user progress is represented as RPG-like attributes

function StatBox({ label, value }) {

  return (
    <div className="stat-box">

      {/* Stat label (e.g., STR, AGI, VIT) */}
      <span className="stat-label">{label}</span>

      {/* Stat value representing current user performance or progression */}
      <span className="stat-value">{value}</span>

    </div>
  )
}

// Export component for reuse in dashboard and character status UI
export default StatBox
