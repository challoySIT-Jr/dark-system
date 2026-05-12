// src/data/gameData.js

export const WORKOUT_DATABASE = {
  BEGINNER: {
    'Day 1': {
      focus: 'Chest & Triceps',
      workouts: [
        { name: 'Push-ups',    reps: '10', sets: '3' },
        { name: 'Bench Press', reps: '8',  sets: '3' },
        { name: 'Tricep Dips', reps: '10', sets: '3' },
      ],
    },
    'Day 2': {
      focus: 'Back & Biceps',
      workouts: [
        { name: 'Pull-ups',      reps: '5',  sets: '3' },
        { name: 'Lat Pulldowns', reps: '10', sets: '3' },
        { name: 'Barbell Curls', reps: '10', sets: '3' },
      ],
    },
    'Day 3': {
      focus: 'Legs & Abs',
      workouts: [
        { name: 'Squats',      reps: '15',  sets: '3' },
        { name: 'Plank',       reps: '30s', sets: '3' },
        { name: 'Leg Raises',  reps: '10',  sets: '3' },
      ],
    },
  },
  INTERMEDIATE: {
    'Day 1': {
      focus: 'Chest & Triceps',
      workouts: [
        { name: 'Push-ups',       reps: '25', sets: '4' },
        { name: 'Incline Press',  reps: '12', sets: '4' },
        { name: 'Skull Crushers', reps: '12', sets: '4' },
      ],
    },
    'Day 2': {
      focus: 'Back & Biceps',
      workouts: [
        { name: 'Pull-ups',        reps: '12', sets: '4' },
        { name: 'Bent Over Rows',  reps: '12', sets: '4' },
        { name: 'Hammer Curls',    reps: '12', sets: '4' },
      ],
    },
    'Day 3': {
      focus: 'Legs & Abs',
      workouts: [
        { name: 'Squats',    reps: '30',  sets: '4' },
        { name: 'Leg Press', reps: '15',  sets: '4' },
        { name: 'Plank',     reps: '60s', sets: '4' },
      ],
    },
  },
  EXPERT: {
    'Day 1': {
      focus: 'Chest & Triceps',
      workouts: [
        { name: 'Push-ups',         reps: '50', sets: '5' },
        { name: 'Dumbbell Flys',    reps: '15', sets: '5' },
        { name: 'Close Grip Press', reps: '15', sets: '5' },
      ],
    },
    'Day 2': {
      focus: 'Back & Biceps',
      workouts: [
        { name: 'Muscle-ups',     reps: '8',  sets: '5' },
        { name: 'Deadlift',       reps: '10', sets: '5' },
        { name: 'Preacher Curls', reps: '15', sets: '5' },
      ],
    },
    'Day 3': {
      focus: 'Legs & Abs',
      workouts: [
        { name: 'Pistol Squats',       reps: '10/leg', sets: '5' },
        { name: 'Hanging Leg Raises',  reps: '20',     sets: '5' },
        { name: 'Dragon Flag',         reps: '10',     sets: '5' },
      ],
    },
  },
}

export const RECOVERY_PROTOCOL = {
  BEGINNER: {
    nutrition:  'Consume 20-30g protein (chicken, eggs, or protein shake) within 30 minutes. Eat a banana or rice for carbs. Drink 500ml water.',
    recovery:   'Light stretching for 10 minutes. Ice bath optional. Sleep 7-8 hours for muscle recovery.',
    hydration:  'Drink 2-3 liters of water throughout the day.',
    rest:       'Take a 15-20 minute power nap if possible.',
  },
  INTERMEDIATE: {
    nutrition:  'Consume 30-40g protein with complex carbs (sweet potato, brown rice). Add electrolytes to your water.',
    recovery:   '15 minutes of foam rolling. Static stretching for muscle groups worked. Massage sore areas.',
    hydration:  'Drink 3-4 liters of water. Add electrolyte powder to one bottle.',
    rest:       '20-30 minute nap or meditation session. Avoid heavy activity for 2 hours.',
  },
  EXPERT: {
    nutrition:  'Consume 40-50g protein with high-quality carbs. Include BCAAs or amino acids. Eat within 15 minutes post-workout.',
    recovery:   '20 minutes of dynamic stretching. Cold plunge (2-3 minutes at 10-15°C). Professional massage recommended.',
    hydration:  'Drink 4-5 liters of water with electrolytes. Monitor urine color for hydration status.',
    rest:       '30-45 minute recovery session. Consider ice baths, sauna, or compression therapy.',
  },
}

export const POST_WORKOUT_QUESTS = [
  'Shadow Training: 10 minutes of light stretching',
  'Mana Recovery: Drink 1L of water immediately',
  'Status Check: Record your weight and feelings',
  'Skill Enhancement: Read 10 pages of a book',
  "Hunter's Rest: Take a 15-minute power nap",
]

export const LEVEL_THRESHOLDS = {
  BEGINNER:     { minXP: 0,    maxXP: 500  },
  INTERMEDIATE: { minXP: 500,  maxXP: 1200 },
  EXPERT:       { minXP: 1200, maxXP: Infinity },
}

export const XP_PER_WORKOUT = {
  BEGINNER:     50,
  INTERMEDIATE: 100,
  EXPERT:       150,
}

export const SPIN_LIMIT = 3

export const getCharacterStats = (xp) => {
  const level = Math.floor(xp / 100) + 1
  return {
    STR: Math.round(10 + level * 2),
    AGI: Math.round(8  + level * 1.5),
    VIT: Math.round(12 + level * 2.5),
    INT: Math.round(7  + level * 1),
    SEN: Math.round(9  + level * 1.5),
  }
}
