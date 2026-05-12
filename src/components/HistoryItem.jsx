// src/components/HistoryItem.jsx

// Component: HistoryItem
// Purpose: Displays a single entry in the workout history (quest log)
// This represents one completed workout session in a clickable list format

function HistoryItem({ entry, onClick }) {

  return (
    // Entire row is clickable to open detailed history view
    <div className="history-item" onClick={onClick}>

      {/* Top row: date and difficulty level */}
      <div className="h-main">
        <span className="h-date">{entry.date}</span>
        <span className="h-level">{entry.level}</span>
      </div>

      {/* Workout schedule info (day and focus area) */}
      <div className="h-sub">
        {entry.day}: {entry.focus}
      </div>

      {/* Workout name displayed */}
      <div className="h-workout">
        {entry.workout}
      </div>

      {/* XP earned from this workout session */}
      <div className="h-xp">
        +{entry.xpEarned} XP
      </div>

    </div>
  )
}

// Export component for reuse in HistoryPage and other views
export default HistoryItem
