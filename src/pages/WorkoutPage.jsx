// src/pages/WorkoutPage.jsx
// Route: /workout/:level/:day   ← DYNAMIC ROUTE
// Shows the mandatory exercise — same layout as original "workout" step

import { useParams, useNavigate } from 'react-router-dom'
import WorkoutCard from '../components/WorkoutCard'

function WorkoutPage({ selectedWorkout, onComplete }) {
  const { level, day } = useParams()
  const navigate       = useNavigate()
  const decodedDay     = decodeURIComponent(day)

  if (!selectedWorkout) {
    return (
      <div className="system-content animate-fade">
        <p style={{ color: '#718096', marginBottom: 16 }}>
          No workout selected. Please spin first.
        </p>
        <button className="system-btn" onClick={() => navigate('/dashboard')}>BACK</button>
      </div>
    )
  }

  const handleComplete = () => {
    const result = onComplete(selectedWorkout, level, decodedDay)
    navigate('/post-workout', { state: result })
  }

  return (
    <div className="system-content animate-fade">
      <h2 className="section-title">MANDATORY EXERCISE</h2>

      <WorkoutCard workout={selectedWorkout} level={level} />

      <button className="system-btn glow" onClick={handleComplete}>
        COMPLETE QUEST
      </button>
      <button
        className="text-btn"
        onClick={() => navigate(`/roulette/${level}/${encodeURIComponent(decodedDay)}`)}
      >
        SPIN AGAIN
      </button>
    </div>
  )
}

export default WorkoutPage
