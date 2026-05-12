// src/components/WorkoutCard.jsx
// Shows the selected exercise — name, sets, reps, difficulty, XP reward

import { XP_PER_WORKOUT } from '../data/gameData.jsx'

function WorkoutCard({ workout, level }) {
  return (
    <div className="workout-display">
      <div className="workout-card">
        <h3 className="w-title">{workout.name}</h3>
        <div className="w-details">
          <div className="detail-box">
            <span className="detail-label">SETS</span>
            <span className="detail-value">{workout.sets}</span>
          </div>
          <div className="detail-box">
            <span className="detail-label">REPS</span>
            <span className="detail-value">{workout.reps}</span>
          </div>
        </div>
      </div>

      <div className="difficulty-info">
        <span className="diff-label">DIFFICULTY:</span>
        <span className="diff-value">{level}</span>
      </div>

      <div className="xp-reward-box">
        <span className="reward-label">XP REWARD:</span>
        <span className="reward-value">+{XP_PER_WORKOUT[level]} XP</span>
      </div>
    </div>
  )
}

export default WorkoutCard
