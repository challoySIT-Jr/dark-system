// src/components/EquipmentSlot.jsx

// Component: EquipmentSlot
// Purpose: Displays a single equipment slot in the UI (e.g., HEAD, BODY, HANDS, LEGS, FEET)
// This is a reusable React component used for showing player gear/status visually

function EquipmentSlot({ label, value }) {

  return (
    <div className="equipment-slot">

      {/* Slot label (e.g., HEAD, BODY, HANDS) */}
      <span className="slot-label">{label}</span>

      {/* Slot content display
          Shows equipped item value or a placeholder if empty */}
      <div className="slot-box">
        {value || '—'}
      </div>

    </div>
  )
}

// Export component so it can be reused in other pages/components
export default EquipmentSlot
