// src/components/RouletteWheel.jsx

// Component: RouletteWheel
// Purpose: Animated slot-machine style workout selector
// This simulates a "system-generated randomized workout recommendation"
// It demonstrates state management, animation logic, and controlled randomness

import { useState } from 'react'
import { WORKOUT_DATABASE, SPIN_LIMIT } from '../data/gameData.jsx'

function RouletteWheel({ level, day, onWorkoutSelected, onAccept }) {

  // Retrieve workout pool based on selected level and day
  const workouts = WORKOUT_DATABASE[level][day].workouts

  // Height of each roulette item (used for animation calculation)
  const itemHeight = 80

  // State: current vertical scroll offset for animation
  const [offset, setOffset] = useState(0)

  // State: tracks whether roulette is currently spinning (prevents spam clicks)
  const [isSpinning, setIsSpinning] = useState(false)

  // State: number of spins used (enforces spin limit mechanic)
  const [spinsUsed, setSpinsUsed] = useState(0)

  // State: currently selected workout result
  const [selected, setSelected] = useState(null)

  const handleSpin = () => {

    // Prevent spinning if animation is active or limit is reached
    if (isSpinning || spinsUsed >= SPIN_LIMIT) return

    setIsSpinning(true)

    // Randomly select a workout index from the available list
    const idx = Math.floor(Math.random() * workouts.length)

    // Calculate final scroll offset for animation effect
    const finalOffset = (30 * workouts.length + idx) * itemHeight
    setOffset(finalOffset)

    // Increase spin count
    const newSpins = spinsUsed + 1
    setSpinsUsed(newSpins)

    // Delay to simulate spinning animation duration
    setTimeout(() => {

      // Selected workout result after spin ends
      const picked = workouts[idx]

      // Save selected workout to state and parent component
      setSelected(picked)
      onWorkoutSelected(picked)

      setIsSpinning(false)

      // Auto-confirm workout if spin limit is reached (game rule mechanic)
      if (newSpins >= SPIN_LIMIT) {
        setTimeout(() => onAccept(picked), 800)
      }

    }, 4000)
  }

  return (
    <div>

      {/* Spin counter display */}
      <div className="spin-limit-info">
        <span className="spin-label">SPINS REMAINING:</span>
        <span className="spin-count">
          {SPIN_LIMIT - spinsUsed}/{SPIN_LIMIT}
        </span>
      </div>

      {/* Animated roulette visual container */}
      <div className="roulette-container">

        {/* Glow effect overlay for futuristic UI styling */}
        <div className="roulette-glow" />

        {/* Scrollable workout strip (animated via transform translateY) */}
        <div
          className="roulette-strip"
          style={{ transform: `translateY(-${offset}px)` }}
        >

          {/* Repeated rendering creates continuous scrolling effect */}
          {Array.from({ length: 40 }).map((_, i) =>
            workouts.map((w, idx) => (
              <div key={`${i}-${idx}`} className="roulette-item">

                {/* Workout name display */}
                <span className="r-name">{w.name}</span>

                {/* Workout stats (sets × reps) */}
                <span className="r-stats">{w.sets}×{w.reps}</span>

              </div>
            ))
          )}

        </div>
      </div>

      {/* Conditional UI: when spin limit is reached */}
      {spinsUsed >= SPIN_LIMIT && selected ? (

        <div className="spin-limit-reached">

          {/* Warning message for system rule enforcement */}
          <p className="warning-text">
            ⚠️ SPIN LIMIT REACHED - INJURY PREVENTION PROTOCOL ACTIVE
          </p>

          {/* Instruction message */}
          <p className="info-text">
            The System has selected your mandatory exercise. Proceeding to workout screen...
          </p>

          {/* Final confirmation button */}
          <button
            className="system-btn glow"
            style={{ marginTop: 12 }}
            onClick={() => onAccept(selected)}
          >
            VIEW WORKOUT
          </button>
        </div>

      ) : (
        <>

          {/* Primary spin button */}
          <button
            className="system-btn glow"
            onClick={handleSpin}
            disabled={isSpinning || spinsUsed >= SPIN_LIMIT}
          >
            {isSpinning
              ? 'SEARCHING...'
              : spinsUsed >= SPIN_LIMIT
              ? 'LIMIT REACHED'
              : 'INITIALIZE SELECTION'}
          </button>

          {/* Accept current selection button (only shows if a workout is selected) */}
          {selected && spinsUsed < SPIN_LIMIT && (
            <button
              className="system-btn"
              onClick={() => onAccept(selected)}
            >
              ACCEPT CURRENT SELECTION
            </button>
          )}

        </>
      )}

    </div>
  )
}

// Export component for use in Workout selection page
export default RouletteWheel
