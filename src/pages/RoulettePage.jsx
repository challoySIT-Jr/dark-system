// src/pages/RoulettePage.jsx
// Route: /roulette/:level/:day   ← DYNAMIC ROUTE
// Workout selector — uses the RouletteWheel component

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RouletteWheel from '../components/RouletteWheel'
import { WORKOUT_DATABASE } from '../data/gameData.jsx'

function RoulettePage({ onWorkoutChosen }) {
  const { level, day } = useParams()
  const navigate       = useNavigate()
  const decodedDay     = decodeURIComponent(day)

  // Guard invalid params
  if (!WORKOUT_DATABASE[level] || !WORKOUT_DATABASE[level][decodedDay]) {
    return (
      <div className="system-content animate-fade">
        <p style={{ color: '#ff6464', marginBottom: 16 }}>Invalid quest parameters.</p>
        <button className="system-btn" onClick={() => navigate('/dashboard')}>BACK</button>
      </div>
    )
  }

  const handleAccept = (workout) => {
    onWorkoutChosen(workout, level, decodedDay)
    navigate(`/workout/${level}/${encodeURIComponent(decodedDay)}`)
  }

  return (
    <div className="system-content animate-fade text-center">
      <h2 className="section-title">SYSTEM ANALYZING QUEST...</h2>
      <p className="roulette-subtitle">
        INITIALIZING WORKOUT SELECTION — {level} / {decodedDay}
      </p>

      <RouletteWheel
        level={level}
        day={decodedDay}
        onWorkoutSelected={() => {}}
        onAccept={handleAccept}
      />

      <button className="text-btn" onClick={() => navigate('/dashboard')}>BACK</button>
    </div>
  )
}

export default RoulettePage
