// src/components/StatBox.jsx
// Displays one character stat tile e.g. STR, AGI, VIT

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}

export default StatBox
