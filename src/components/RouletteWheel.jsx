// src/components/RouletteWheel.jsx
// Animated slot-machine workout selector — identical behaviour to original

import { useState } from 'react'
import { WORKOUT_DATABASE, SPIN_LIMIT } from '../data/gameData.jsx'

function RouletteWheel({ level, day, onWorkoutSelected, onAccept }) {
  const workouts   = WORKOUT_DATABASE[level][day].workouts
  const itemHeight = 80

  const [offset,     setOffset]     = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinsUsed,  setSpinsUsed]  = useState(0)
  const [selected,   setSelected]   = useState(null)

  const handleSpin = () => {
    if (isSpinning || spinsUsed >= SPIN_LIMIT) return
    setIsSpinning(true)

    const idx         = Math.floor(Math.random() * workouts.length)
    const finalOffset = (30 * workouts.length + idx) * itemHeight
    setOffset(finalOffset)

    const newSpins = spinsUsed + 1
    setSpinsUsed(newSpins)

    setTimeout(() => {
      const picked = workouts[idx]
      setSelected(picked)
      onWorkoutSelected(picked)
      setIsSpinning(false)
      if (newSpins >= SPIN_LIMIT) {
        setTimeout(() => onAccept(picked), 800)
      }
    }, 4000)
  }

  return (
    <div>
      {/* Spin counter */}
      <div className="spin-limit-info">
        <span className="spin-label">SPINS REMAINING:</span>
        <span className="spin-count">{SPIN_LIMIT - spinsUsed}/{SPIN_LIMIT}</span>
      </div>

      {/* Animated reel */}
      <div className="roulette-container">
        <div className="roulette-glow" />
        <div
          className="roulette-strip"
          style={{ transform: `translateY(-${offset}px)` }}
        >
          {Array.from({ length: 40 }).map((_, i) =>
            workouts.map((w, idx) => (
              <div key={`${i}-${idx}`} className="roulette-item">
                <span className="r-name">{w.name}</span>
                <span className="r-stats">{w.sets}×{w.reps}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Spin limit reached */}
      {spinsUsed >= SPIN_LIMIT && selected ? (
        <div className="spin-limit-reached">
          <p className="warning-text">⚠️ SPIN LIMIT REACHED - INJURY PREVENTION PROTOCOL ACTIVE</p>
          <p className="info-text">The System has selected your mandatory exercise. Proceeding to workout screen...</p>
          <button className="system-btn glow" style={{ marginTop: 12 }} onClick={() => onAccept(selected)}>
            VIEW WORKOUT
          </button>
        </div>
      ) : (
        <>
          <button
            className="system-btn glow"
            onClick={handleSpin}
            disabled={isSpinning || spinsUsed >= SPIN_LIMIT}
          >
            {isSpinning ? 'SEARCHING...' : spinsUsed >= SPIN_LIMIT ? 'LIMIT REACHED' : 'INITIALIZE SELECTION'}
          </button>
          {selected && spinsUsed < SPIN_LIMIT && (
            <button className="system-btn" onClick={() => onAccept(selected)}>
              ACCEPT CURRENT SELECTION
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default RouletteWheel
