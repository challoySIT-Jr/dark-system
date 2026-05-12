// src/components/ProtocolBox.jsx
// One post-workout recovery card — nutrition, hydration, recovery, rest

function ProtocolBox({ icon, header, text }) {
  return (
    <div className="protocol-box">
      <h4 className="protocol-header">{icon} {header}</h4>
      <p className="protocol-text">{text}</p>
    </div>
  )
}

export default ProtocolBox
