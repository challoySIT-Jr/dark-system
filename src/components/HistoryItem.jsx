// src/components/HistoryItem.jsx
// One row in the quest log list — clickable to view detail

function HistoryItem({ entry, onClick }) {
  return (
    <div className="history-item" onClick={onClick}>
      <div className="h-main">
        <span className="h-date">{entry.date}</span>
        <span className="h-level">{entry.level}</span>
      </div>
      <div className="h-sub">{entry.day}: {entry.focus}</div>
      <div className="h-workout">{entry.workout}</div>
      <div className="h-xp">+{entry.xpEarned} XP</div>
    </div>
  )
}

export default HistoryItem
