# RepRun — App Specification

## Overview

**App Name:** RepRun  
**Platform:** Mobile (iOS / Android)  
**Purpose:** A personal workout tracking app with a predetermined weekly schedule. The user ticks off each set and rep as they complete them during a workout session.

---

## Core Concept

RepRun is a simple, low-friction workout companion. The schedule is pre-loaded and does not change day-to-day unless manually edited. The primary interaction is opening the app on a workout day and ticking off sets as you go.

---

## Key Features

### 1. Daily Workout Screen (Home)
- Shows today's workout name (e.g. "Back + Biceps", "Rest Day")
- Displays current date
- Shows a progress bar indicating how many sets have been completed out of the total
- Lists each exercise for the day as a card

### 2. Exercise Cards
- Each exercise card displays:
  - Exercise name
  - A badge showing sets completed vs total (e.g. "2 / 4 done")
- Each card is expandable to show individual set rows

### 3. Set Rows
- Each set row displays:
  - Set number
  - Rep range (e.g. "8–12 reps")
  - Weight (if applicable)
  - A tick/checkbox button on the right
- Ticking a set marks it as done (turns green)
- Ticking again un-ticks it (in case of mistakes)

### 4. Progress Tracking
- Top-level progress bar on the daily screen updates as sets are ticked
- Badge on each exercise card updates as sets within it are ticked
- When all sets in a workout are done, show a completion state (e.g. "Workout complete! 🎉")

### 5. Weekly Schedule Screen
- Shows a 7-day week view
- Each day displays its assigned workout name
- Tapping a day shows the full workout for that day
- Allows the user to view past days and upcoming days

### 6. Progress / History Screen
- Shows a log of past completed workouts
- Indicates which days were completed vs skipped

### 7. Settings Screen
- Edit the weekly schedule (assign workouts to days)
- Edit exercises within each workout (add, remove, reorder)
- Edit sets/reps/weight for each exercise

---

## Data Structure

### Weekly Schedule
```
Week:
  Monday:    workout_id
  Tuesday:   workout_id
  Wednesday: workout_id
  Thursday:  workout_id
  Friday:    workout_id
  Saturday:  workout_id (or "Rest")
  Sunday:    workout_id (or "Rest")
```

### Workout
```
Workout:
  id:         string
  name:       string        (e.g. "Back + Biceps")
  exercises:  Exercise[]
```

### Exercise
```
Exercise:
  id:         string
  name:       string        (e.g. "Pull-ups or Lat Pulldown")
  sets:       Set[]
```

### Set
```
Set:
  set_number: integer
  reps_min:   integer
  reps_max:   integer
  weight:     number (optional)
  unit:       "kg" | "lbs" (optional)
  note:       string (optional, e.g. "per leg", "seconds")
```

### Daily Log (persisted per day)
```
DailyLog:
  date:       string        (ISO date, e.g. "2026-05-22")
  workout_id: string
  sets_done:  string[]      (list of set IDs ticked)
```

---

## UI Screens Summary

| Screen       | Description                                      |
|--------------|--------------------------------------------------|
| Today        | Today's workout with ticking interface           |
| Schedule     | Weekly calendar view of assigned workouts        |
| Progress     | History log of completed sessions                |
| Settings     | Edit workouts, exercises, sets, and the schedule |

---

## Navigation

Bottom tab bar with 4 items:
1. **Today** — clipboard-list icon
2. **Schedule** — calendar icon
3. **Progress** — bar chart icon
4. **Settings** — settings/cog icon

---

## Design Style

- Clean, minimal, mobile-first
- Primary accent colour: teal/green (`#1D9E75`)
- Completed states shown in green
- Pending states shown in muted/grey
- Cards with soft borders and rounded corners
- No gradients or heavy shadows
- Exercise cards are expandable to reveal set rows

---

## Tech Suggestions (flexible)

- **React Native** or **Flutter** for cross-platform mobile
- **Local storage / SQLite** for persisting the schedule and daily logs
- No backend or account required — fully offline app
- State management: React Context or Zustand (if React Native)

---

## Workout Schedule

**Program:** 7-Day Hypertrophy & Aesthetics Program  
**Focus:** Muscle growth, ab development, fat loss  
**Rep Range:** 8–15 reps (unless noted)  
**Rest:** 60–90 seconds between sets

---

### Monday — Back + Biceps

**Back**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Pull-ups or Lat Pulldown          | 4    | 8–12     |       |
| Barbell or Chest-Supported Row    | 3    | 8–12     |       |
| Seated Cable Row                  | 3    | 10–12    |       |
| Straight-Arm Pulldown             | 2–3  | 12–15    |       |

**Biceps**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Barbell or Dumbbell Curls         | 3    | 8–12     |       |
| Incline Dumbbell Curls            | 3    | 10–12    |       |
| Cable or Machine Curls            | 2–3  | 12–15    |       |

---

### Tuesday — Chest + Triceps + Abs

**Chest**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Barbell or DB Bench Press         | 4    | 6–10     |       |
| Incline Dumbbell Press            | 3    | 8–12     |       |
| Cable or Pec Deck Fly             | 3    | 12–15    |       |

**Triceps**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Close-Grip Push-Ups               | 3    | 10–15    |       |
| Overhead Triceps Extension        | 3    | 10–15    |       |
| Rope Pushdowns                    | 3    | 12–15    |       |

**Abs**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Cable Crunch                      | 4    | 12–15    |       |
| Hanging Knee or Leg Raises        | 3    | 10–15    |       |

---

### Wednesday — Quads + Glutes + Abs

**Quads / Glutes**
| Exercise                          | Sets | Reps     | Notes       |
|-----------------------------------|------|----------|-------------|
| Squats or Leg Press               | 4    | 6–10     |             |
| Bulgarian Split Squats            | 3    | 8–12     | per leg     |
| Walking Lunges                    | 3    | 10–12    | per leg     |
| Leg Extensions                    | 3    | 12–15    |             |

**Abs**
| Exercise                          | Sets | Reps     | Notes |
|-----------------------------------|------|----------|-------|
| Hanging Leg Raises                | 4    | 10–15    |       |
| Reverse Crunches                  | 3    | 15       |       |

---

### Thursday — Shoulders + Triceps + Abs

**Shoulders**
| Exercise                                  | Sets | Reps     | Notes |
|-------------------------------------------|------|----------|-------|
| Overhead Press (BB or DB)                 | 4    | 6–10     |       |
| Lateral Raises                            | 4    | 12–15    |       |
| Rear Delt Fly                             | 3    | 12–15    |       |
| Upright Rows or Cable Lateral Raises      | 2–3  | 12–15    |       |

**Abs**
| Exercise                          | Sets | Reps / Duration | Notes    |
|-----------------------------------|------|-----------------|----------|
| Hanging Leg Raises                | 4    | 10–15           | per side |
| Weighted Plank                    | 3    | 80–45 sec       |          |

---

### Friday — Hamstrings + Back + Abs

**Hamstrings / Glutes**
| Exercise                          | Sets | Reps     | Notes   |
|-----------------------------------|------|----------|---------|
| Squats or Leg Press               | 4    | 8–12     |         |
| Lying or Seated Leg Curls         | 3    | 10–15    |         |
| Walking Lunges                    | 3    | 10–12    | per leg |
| Leg Extensions                    | 3    | 12–15    |         |

---

### Saturday — Rest / Active Recovery

Light walking, stretching, or mobility work. No weighted exercises.

---

### Sunday — Rest / Active Recovery

Light walking, stretching, or mobility work. No weighted exercises.

---

## Additional Notes for Developer

- The schedule is **predetermined** — the user sets it up once and it repeats weekly
- The main daily interaction should be as fast and frictionless as possible (open app → tick sets → done)
- Ticked state should persist if the user closes and reopens the app mid-workout
- Show a simple "Rest Day" screen for Saturday and Sunday
- Rep ranges (e.g. 8–12) should be stored as `reps_min` and `reps_max` and displayed as a range
- Some sets have variable set counts (e.g. "2–3 sets") — store the upper value as default, allow user to adjust
- Some exercises have per-leg/per-side notes — store these in the `note` field on the Set
- Plank and timed exercises use seconds instead of reps — the `note` field can indicate "seconds"

## Cardio Guidance (displayed as a reminder, not tracked as sets)

- 3–4x per week, after workouts or separate time
- 20–30 min incline walk, cycling, or stair climber

## Nutrition Reminders (optional info screen)

- Protein: 0.7–1g per lb of bodyweight
- Small calorie deficit: 500–600 below maintenance
- 6–12K steps per day
