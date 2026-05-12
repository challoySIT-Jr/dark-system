// src/components/EquipmentSlot.jsx
// Displays one equipment slot box — HEAD, BODY, HANDS, LEGS, FEET

function EquipmentSlot({ label, value }) {
  return (
    <div className="equipment-slot">
      <span className="slot-label">{label}</span>
      <div className="slot-box">{value || '—'}</div>
    </div>
  )
}

export default EquipmentSlot
