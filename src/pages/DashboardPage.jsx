// src/pages/DashboardPage.jsx
// Route: /dashboard
// Main hub — rank, XP, character stats, equipment, level picker, day picker

import { useNavigate } from 'react-router-dom'
import XPBar         from '../components/XPBar'
import StatBox       from '../components/StatBox'
import EquipmentSlot from '../components/EquipmentSlot'
import LevelCard     from '../components/LevelCard'
import {
  WORKOUT_DATABASE,
  LEVEL_THRESHOLDS,
  getCharacterStats,
} from '../data/gameData.jsx'

function DashboardPage({ userData, selectedLevel, selectedDay, onLevelChange, onDayChange }) {
  const navigate = useNavigate()
  const stats    = getCharacterStats(userData.xp)

  return (
    <div className="system-content animate-fade">

      {/* Rank */}
      <div className="status-row">
        <span className="label">RANK:</span>
        <span className="value gold">{userData.currentLevel}</span>
      </div>

      {/* XP progress bar */}
      <XPBar xp={userData.xp} currentLevel={userData.currentLevel} />

      {/* Character status */}
      <div className="status-window">
        <h3 className="status-title">CHARACTER STATUS</h3>

        <div className="stats-grid">
          {Object.entries(stats).map(([key, val]) => (
            <StatBox key={key} label={key} value={val} />
          ))}
        </div>

        <h4 className="equipment-title">EQUIPMENT</h4>
        <div className="equipment-slots">
          {['HEAD', 'BODY', 'HANDS', 'LEGS', 'FEET'].map(slot => (
            <EquipmentSlot key={slot} label={slot} value={null} />
          ))}
        </div>
      </div>

      {/* Difficulty selector */}
      <h3 className="section-title">SELECT DIFFICULTY</h3>
      <div className="level-grid">
        {['BEGINNER', 'INTERMEDIATE', 'EXPERT'].map(lvl => (
          <LevelCard
            key={lvl}
            level={lvl}
            active={selectedLevel === lvl}
            locked={!userData.unlocked.includes(lvl)}
            xpRequired={LEVEL_THRESHOLDS[lvl].minXP}
            onClick={() => userData.unlocked.includes(lvl) && onLevelChange(lvl)}
          />
        ))}
      </div>

      {/* Day picker */}
      <div className="quest-selection">
        <label>SELECT QUEST DAY</label>
        <select
          className="system-select"
          value={selectedDay}
          onChange={e => onDayChange(e.target.value)}
        >
          {Object.keys(WORKOUT_DATABASE[selectedLevel]).map(day => (
            <option key={day} value={day}>
              {day}: {WORKOUT_DATABASE[selectedLevel][day].focus}
            </option>
          ))}
        </select>
      </div>

      <div className="nav-buttons">
        <button
          className="system-btn glow"
          onClick={() => navigate(`/roulette/${selectedLevel}/${encodeURIComponent(selectedDay)}`)}
        >
          ACCEPT QUEST
        </button>
        <button className="system-btn secondary" onClick={() => navigate('/history')}>
          CHECK HISTORY
        </button>
      </div>

    </div>
  )
}

export default DashboardPage
