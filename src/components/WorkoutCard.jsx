// src/components/WorkoutCard.jsx

// Component: WorkoutCard
// Purpose: Displays the selected workout details after roulette selection
// This includes workout name, sets, reps, difficulty level, and XP reward
// It acts as the main “result display” of the system

import { XP_PER_WORKOUT } from '../data/gameData.jsx'

function WorkoutCard({ workout, level }) {

  return (
    <div className="workout-display">

      {/* Main workout information card */}
      <div className="workout-card">

        {/* Workout name display */}
        <h3 className="w-title">{workout.name}</h3>

        {/* Workout stats section (sets and reps) */}
        <div className="w-details">

          {/* Sets information */}
          <div className="detail-box">
            <span className="detail-label">SETS</span>
            <span className="detail-value">{workout.sets}</span>
          </div>

          {/* Reps information */}
          <div className="detail-box">
            <span className="detail-label">REPS</span>
            <span className="detail-value">{workout.reps}</span>
          </div>

        </div>
      </div>

      {/* Difficulty display (based on selected level from system) */}
      <div className="difficulty-info">
        <span className="diff-label">DIFFICULTY:</span>
        <span className="diff-value">{level}</span>
      </div>

      {/* XP reward system (gamification mechanic) */}
      <div className="xp-reward-box">
        <span className="reward-label">XP REWARD:</span>
        <span className="reward-value">
          +{XP_PER_WORKOUT[level]} XP
        </span>
      </div>

    </div>
  )
}

// Export component for use in workout and result pages
export default WorkoutCard
