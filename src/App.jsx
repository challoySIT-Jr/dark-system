// src/App.jsx

// Import React hooks for state management and side effects
import { useState, useEffect } from 'react'

// Import React Router tools for routing/navigation
import {
  MemoryRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom'

// Import page components
import SurveyPage from './pages/SurveyPage'
import DashboardPage from './pages/DashboardPage'
import RoulettePage from './pages/RoulettePage'
import WorkoutPage from './pages/WorkoutPage'
import PostWorkoutPage from './pages/PostWorkoutPage'
import HistoryPage from './pages/HistoryPage'
import HistoryDetailPage from './pages/HistoryDetailPage'

// Import game data constants
import {
  XP_PER_WORKOUT,
  LEVEL_THRESHOLDS,
  POST_WORKOUT_QUESTS,
  WORKOUT_DATABASE,
} from './data/gameData.jsx'

// Import global stylesheet
import './App.css'


// Navigation bar component
// Located inside App.jsx so router hooks can be used directly
function NavBar({ hasUser, onExit }) {

  // Hook for page navigation
  const navigate = useNavigate()

  // Hook for detecting current route
  const location = useLocation()

  // Handles exit button click
  const handleExit = () => {

    // Confirmation dialog before resetting session
    if (window.confirm('ARE YOU SURE YOU WANT TO TERMINATE THE SESSION?')) {
      onExit()
      navigate('/')
    }
  }

  return (
    <div className="system-header">

      {/* Left header section */}
      <div className="header-left">
        <span className="system-label">THE SYSTEM</span>
        <h1 className="main-title">LEVELING FITNESS</h1>
      </div>

      {/* Only show navigation if user already exists */}
      {hasUser && (
        <div className="header-nav">

          {/* Dashboard navigation button */}
          <button
            className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            STATUS
          </button>

          {/* History navigation button */}
          <button
            className={`nav-btn ${location.pathname.startsWith('/history') ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >
            LOG
          </button>

          {/* Exit button */}
          <button
            className="nav-btn danger"
            onClick={handleExit}
          >
            ×
          </button>

        </div>
      )}
    </div>
  )
}


// Inner app component
// Must be inside MemoryRouter to use router hooks
function InnerApp() {

  // Stores current user information
  const [userData, setUserData] = useState(null)

  // Stores completed workout history
  const [history, setHistory] = useState([])

  // Stores currently selected difficulty level
  const [selectedLevel, setSelectedLevel] = useState('BEGINNER')

  // Stores selected workout day
  const [selectedDay, setSelectedDay] = useState('Day 1')

  // Stores currently chosen workout
  const [selectedWorkout, setSelectedWorkout] = useState(null)


  // Loads saved data from localStorage on first render
  useEffect(() => {
    try {
      const u = localStorage.getItem('lf_user')
      const h = localStorage.getItem('lf_history')

      // Restore saved user data
      if (u) {
        const p = JSON.parse(u)
        setUserData(p)
        setSelectedLevel(p.currentLevel)
      }

      // Restore workout history
      if (h) {
        setHistory(JSON.parse(h))
      }

    } catch (_) {}
  }, [])


  // Saves user and history data to localStorage
  const save = (u, h) => {
    try {
      if (u !== undefined) {
        localStorage.setItem('lf_user', JSON.stringify(u))
      }

      if (h !== undefined) {
        localStorage.setItem('lf_history', JSON.stringify(h))
      }

    } catch (_) {}
  }


  // Initializes user after survey form submission
  const handleInit = (data) => {
    setUserData(data)
    save(data, [])
  }


  // Clears localStorage and resets all states
  const handleExit = () => {
    try {
      localStorage.removeItem('lf_user')
      localStorage.removeItem('lf_history')
    } catch (_) {}

    setUserData(null)
    setHistory([])
    setSelectedLevel('BEGINNER')
    setSelectedDay('Day 1')
    setSelectedWorkout(null)
  }


  // Stores selected workout from roulette page
  const handleWorkoutChosen = (workout, level, day) => {
    setSelectedWorkout(workout)
    setSelectedLevel(level)
    setSelectedDay(day)
  }


  // Handles workout completion logic
  const handleComplete = (workout, level, day) => {

    // XP earned depends on difficulty level
    const xpEarned = XP_PER_WORKOUT[level]

    // Add earned XP to current total
    const newXp = (userData?.xp || 0) + xpEarned

    let newLevel = userData.currentLevel
    let newUnlocked = [...userData.unlocked]
    let leveledUp = false


    // Unlock INTERMEDIATE level
    if (
      newXp >= LEVEL_THRESHOLDS.INTERMEDIATE.minXP &&
      !newUnlocked.includes('INTERMEDIATE')
    ) {
      newUnlocked.push('INTERMEDIATE')
      newLevel = 'INTERMEDIATE'
      leveledUp = true
    }


    // Unlock EXPERT level
    if (
      newXp >= LEVEL_THRESHOLDS.EXPERT.minXP &&
      !newUnlocked.includes('EXPERT')
    ) {
      newUnlocked.push('EXPERT')
      newLevel = 'EXPERT'
      leveledUp = true
    }


    // Update user data after workout
    const updatedUser = {
      ...userData,
      xp: newXp,
      currentLevel: newLevel,
      unlocked: newUnlocked
    }


    // Randomly assign post-workout bonus quest
    const quest =
      POST_WORKOUT_QUESTS[
        Math.floor(Math.random() * POST_WORKOUT_QUESTS.length)
      ]


    // Create workout history entry
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      level,
      day,
      focus: WORKOUT_DATABASE[level][day].focus,
      workout: workout.name,
      xpEarned
    }


    // Add newest history entry to top
    const updatedHistory = [entry, ...history]


    // Update state and save data
    setUserData(updatedUser)
    setHistory(updatedHistory)
    save(updatedUser, updatedHistory)


    // Return workout result data
    return {
      xpEarned,
      leveledUp,
      newLevel,
      quest,
      level
    }
  }


  return (
    <div className="system-container">

      {/* Background overlay */}
      <div className="system-overlay" />

      {/* Main application window */}
      <div className="system-window">

        {/* Navigation header */}
        <NavBar
          hasUser={!!userData}
          onExit={handleExit}
        />

        {/* Application routes */}
        <Routes>

          {/* Landing page or redirect */}
          <Route
            path="/"
            element={
              userData
                ? <Navigate to="/dashboard" replace />
                : <SurveyPage onInit={handleInit} />
            }
          />

          {/* Dashboard page */}
          <Route
            path="/dashboard"
            element={
              userData
                ? (
                  <DashboardPage
                    userData={userData}
                    selectedLevel={selectedLevel}
                    selectedDay={selectedDay}
                    onLevelChange={setSelectedLevel}
                    onDayChange={setSelectedDay}
                  />
                )
                : <Navigate to="/" replace />
            }
          />

          {/* Dynamic route for roulette page */}
          <Route
            path="/roulette/:level/:day"
            element={<RoulettePage onWorkoutChosen={handleWorkoutChosen} />}
          />

          {/* Dynamic route for workout page */}
          <Route
            path="/workout/:level/:day"
            element={
              <WorkoutPage
                selectedWorkout={selectedWorkout}
                onComplete={handleComplete}
              />
            }
          />

          {/* Post workout result page */}
          <Route
            path="/post-workout"
            element={<PostWorkoutPage />}
          />

          {/* Workout history page */}
          <Route
            path="/history"
            element={<HistoryPage history={history} />}
          />

          {/* Dynamic route for history detail */}
          <Route
            path="/history/:id"
            element={<HistoryDetailPage history={history} />}
          />

        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer-bar">
        THE SYSTEM TRACKS EVERY DROP OF SWEAT.
      </footer>
    </div>
  )
}


// Main App component
// Wraps InnerApp with MemoryRouter
function App() {
  return (
    <MemoryRouter>
      <InnerApp />
    </MemoryRouter>
  )
}

// Export App component
export default App
