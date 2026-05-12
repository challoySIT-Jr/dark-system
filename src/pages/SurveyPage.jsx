// src/pages/SurveyPage.jsx
// Route: /
// Player initialization — age, experience, years of training

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SurveyPage({ onInit }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ age: '', experience: '', years: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const unlocked = form.experience === 'yes'
      ? ['BEGINNER', 'INTERMEDIATE', 'EXPERT']
      : ['BEGINNER']
    onInit({ ...form, xp: 0, currentLevel: 'BEGINNER', unlocked })
    navigate('/dashboard')
  }

  return (
    <div className="system-content animate-fade">
      <h2 className="section-title">PLAYER INITIALIZATION</h2>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="input-group">
          <label>PLAYER AGE</label>
          <input
            type="number"
            required
            value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })}
            placeholder="Enter Age..."
          />
        </div>

        <div className="input-group">
          <label>DO YOU HAVE PREVIOUS EXPERIENCE?</label>
          <select
            required
            value={form.experience}
            onChange={e => setForm({ ...form, experience: e.target.value })}
          >
            <option value="">Select Option</option>
            <option value="yes">YES (Unlocks All Levels)</option>
            <option value="no">NO (Start as Beginner)</option>
          </select>
        </div>

        {form.experience === 'yes' && (
          <div className="input-group animate-slide-down">
            <label>YEARS OF TRAINING</label>
            <input
              type="number"
              value={form.years}
              onChange={e => setForm({ ...form, years: e.target.value })}
              placeholder="Number of years..."
            />
          </div>
        )}

        <button type="submit" className="system-btn glow">
          INITIALIZE SYSTEM
        </button>
      </form>
    </div>
  )
}

export default SurveyPage
