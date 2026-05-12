// src/components/ProtocolBox.jsx

// Component: ProtocolBox
// Purpose: Displays a recovery instruction card after a workout
// Used for post-workout guidance such as nutrition, hydration, rest, and recovery tips
// Helps simulate a "system feedback" or "AI coaching" feature in the application

function ProtocolBox({ icon, header, text }) {

  return (
    <div className="protocol-box">

      {/* Header section combining icon + title (e.g., hydration, rest, nutrition) */}
      <h4 className="protocol-header">
        {icon} {header}
      </h4>

      {/* Main instructional content for recovery guidance */}
      <p className="protocol-text">
        {text}
      </p>

    </div>
  )
}

// Export component for reuse in PostWorkout or Recovery pages
export default ProtocolBox
