// src/App.jsx
// Root component — all shared state lives here, all routes defined here

import { useState, useEffect } from 'react'
import { MemoryRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

import SurveyPage        from './pages/SurveyPage'
import DashboardPage     from './pages/DashboardPage'
import RoulettePage      from './pages/RoulettePage'
import WorkoutPage       from './pages/WorkoutPage'
import PostWorkoutPage   from './pages/PostWorkoutPage'
import HistoryPage       from './pages/HistoryPage'
import HistoryDetailPage from './pages/HistoryDetailPage'

import {
  XP_PER_WORKOUT,
  LEVEL_THRESHOLDS,
  POST_WORKOUT_QUESTS,
  WORKOUT_DATABASE,
} from './data/gameData.jsx'

import './App.css'

// NavBar inside App.jsx so it can use router hooks
function NavBar({ hasUser, onExit }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleExit = () => {
    if (window.confirm('ARE YOU SURE YOU WANT TO TERMINATE THE SESSION?')) {
      onExit()
      navigate('/')
    }
  }

  return (
    <div className="system-header">
      <div className="header-left">
        <span className="system-label">THE SYSTEM</span>
        <h1 className="main-title">LEVELING FITNESS</h1>
      </div>
      {hasUser && (
        <div className="header-nav">
          <button
            className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >STATUS</button>
          <button
            className={`nav-btn ${location.pathname.startsWith('/history') ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >LOG</button>
          <button className="nav-btn danger" onClick={handleExit}>×</button>
        </div>
      )}
    </div>
  )
}

// InnerApp needs to be inside MemoryRouter to use hooks
function InnerApp() {
  const [userData,        setUserData]        = useState(null)
  const [history,         setHistory]         = useState([])
  const [selectedLevel,   setSelectedLevel]   = useState('BEGINNER')
  const [selectedDay,     setSelectedDay]     = useState('Day 1')
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  useEffect(() => {
    try {
      const u = localStorage.getItem('lf_user')
      const h = localStorage.getItem('lf_history')
      if (u) { const p = JSON.parse(u); setUserData(p); setSelectedLevel(p.currentLevel) }
      if (h) setHistory(JSON.parse(h))
    } catch (_) {}
  }, [])

  const save = (u, h) => {
    try {
      if (u !== undefined) localStorage.setItem('lf_user',    JSON.stringify(u))
      if (h !== undefined) localStorage.setItem('lf_history', JSON.stringify(h))
    } catch (_) {}
  }

  const handleInit = (data) => { setUserData(data); save(data, []) }

  const handleExit = () => {
    try { localStorage.removeItem('lf_user'); localStorage.removeItem('lf_history') } catch (_) {}
    setUserData(null); setHistory([]); setSelectedLevel('BEGINNER')
    setSelectedDay('Day 1'); setSelectedWorkout(null)
  }

  const handleWorkoutChosen = (workout, level, day) => {
    setSelectedWorkout(workout); setSelectedLevel(level); setSelectedDay(day)
  }

  const handleComplete = (workout, level, day) => {
    const xpEarned  = XP_PER_WORKOUT[level]
    const newXp     = (userData?.xp || 0) + xpEarned
    let newLevel    = userData.currentLevel
    let newUnlocked = [...userData.unlocked]
    let leveledUp   = false

    if (newXp >= LEVEL_THRESHOLDS.INTERMEDIATE.minXP && !newUnlocked.includes('INTERMEDIATE')) {
      newUnlocked.push('INTERMEDIATE'); newLevel = 'INTERMEDIATE'; leveledUp = true
    }
    if (newXp >= LEVEL_THRESHOLDS.EXPERT.minXP && !newUnlocked.includes('EXPERT')) {
      newUnlocked.push('EXPERT'); newLevel = 'EXPERT'; leveledUp = true
    }

    const updatedUser    = { ...userData, xp: newXp, currentLevel: newLevel, unlocked: newUnlocked }
    const quest          = POST_WORKOUT_QUESTS[Math.floor(Math.random() * POST_WORKOUT_QUESTS.length)]
    const entry          = { id: Date.now(), date: new Date().toLocaleDateString(), level, day, focus: WORKOUT_DATABASE[level][day].focus, workout: workout.name, xpEarned }
    const updatedHistory = [entry, ...history]

    setUserData(updatedUser); setHistory(updatedHistory); save(updatedUser, updatedHistory)
    return { xpEarned, leveledUp, newLevel, quest, level }
  }

  return (
    <div className="system-container">
      <div className="system-overlay" />
      <div className="system-window">
        <NavBar hasUser={!!userData} onExit={handleExit} />
        <Routes>
          <Route path="/"             element={userData ? <Navigate to="/dashboard" replace /> : <SurveyPage onInit={handleInit} />} />
          <Route path="/dashboard"    element={userData ? <DashboardPage userData={userData} selectedLevel={selectedLevel} selectedDay={selectedDay} onLevelChange={setSelectedLevel} onDayChange={setSelectedDay} /> : <Navigate to="/" replace />} />
          <Route path="/roulette/:level/:day" element={<RoulettePage onWorkoutChosen={handleWorkoutChosen} />} />
          <Route path="/workout/:level/:day"  element={<WorkoutPage selectedWorkout={selectedWorkout} onComplete={handleComplete} />} />
          <Route path="/post-workout"         element={<PostWorkoutPage />} />
          <Route path="/history"              element={<HistoryPage history={history} />} />
          <Route path="/history/:id"          element={<HistoryDetailPage history={history} />} />
        </Routes>
      </div>
      <footer className="footer-bar">THE SYSTEM TRACKS EVERY DROP OF SWEAT.</footer>
    </div>
  )
}

function App() {
  return (
    <MemoryRouter>
      <InnerApp />
    </MemoryRouter>
  )
}

export default App
