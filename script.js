const workouts = {
  monday: {
    name: "Back + Biceps",
    groups: [
      {
        name: "Back",
        exercises: [
          { name: "Pull-ups or Lat Pulldown", sets: "4x8-12" },
          { name: "Barbell or Chest-Supported Row", sets: "3x8-12" },
          { name: "Seated Cable Row", sets: "3x10-12" },
          { name: "Straight-Arm Pulldown", sets: "2-3x12-15" },
        ],
      },
      {
        name: "Biceps",
        exercises: [
          { name: "Incline Dumbbell Curls", sets: "3x10-12" },
          { name: "Cable or Machine Curls", sets: "2-3x12-15" },
          { name: "Barbell or Dumbbell Curls", sets: "3x8-12" },
        ],
      },
    ],
  },
  tuesday: {
    name: "Chest + Triceps + Abs",
    groups: [
      {
        name: "Chest",
        exercises: [
          { name: "Barbell or DB Bench Press", sets: "4x6-10" },
          { name: "Incline Dumbbell Press", sets: "3x8-12" },
          { name: "Cable or Pec Deck Fly", sets: "3x12-15" },
        ],
      },
      {
        name: "Triceps",
        exercises: [
          { name: "Barbell Tricep Extensions", sets: "3x10-15" },
          { name: "Overhead Triceps Extension", sets: "3x10-15" },
          { name: "Rope Pushdowns", sets: "3x12-15" },
        ],
      },
      {
        name: "Abs",
        exercises: [
          { name: "Cable Crunch", sets: "4x12-15" },
          { name: "Hanging Knee or Leg Raises", sets: "3x10-15" },
        ],
      },
    ],
  },
  wednesday: {
    name: "Quads + Glutes + Abs",
    groups: [
      {
        name: "Quads / Glutes",
        exercises: [
          { name: "Squats or Leg Press", sets: "4x6-10" },
          { name: "Walking Lunges", sets: "3x10-12/leg" },
          { name: "Leg Extensions", sets: "3x12-15" },
          { name: "Bulgarian Split Squats", sets: "3x8-12/leg" },
        ],
      },
      {
        name: "Abs",
        exercises: [
          { name: "Hanging Leg Raises", sets: "4x10-15" },
          { name: "Reverse Crunches", sets: "3x15" },
        ],
      },
    ],
  },
  thursday: {
    name: "Shoulders + Abs",
    groups: [
      {
        name: "Shoulders",
        exercises: [
          { name: "Overhead Press (BB or DB)", sets: "4x6-10" },
          { name: "Lateral Raises", sets: "4x12-15" },
          { name: "Rear Delt Fly", sets: "3x12-15" },
          { name: "Upright Rows or Cable Laterals", sets: "2-3x12-15" },
        ],
      },
      {
        name: "Abs",
        exercises: [
          { name: "Hanging Leg Raises", sets: "4x10-15/side" },
          { name: "Weighted Plank", sets: "3x30-45s" },
        ],
      },
    ],
  },
  friday: {
    name: "Hamstrings + Back + Abs",
    groups: [
      {
        name: "Hamstrings / Glutes",
        exercises: [
          { name: "Squats or Leg Press", sets: "4x8-12" },
          { name: "Lying or Seated Leg Curls", sets: "3x10-15" },
          { name: "Walking Lunges", sets: "3x10-12/leg" },
          { name: "Leg Extensions", sets: "3x12-15" },
        ],
      },
      {
        name: "Abs",
        exercises: [
          { name: "Hanging Leg Raises", sets: "4x10-15" },
        ],
      },
    ],
  },
  saturday: {
    name: "Cardio + Core",
    groups: [
      {
        name: "Cardio",
        exercises: [
          { name: "Incline Walk or Cycling", sets: "20-30 min" },
        ],
      },
      {
        name: "Core",
        exercises: [
          { name: "Plank", sets: "3x45-60s" },
          { name: "Russian Twists", sets: "3x15/side" },
        ],
      },
    ],
  },
  sunday: {
    name: "Rest / Active Recovery",
    groups: [
      {
        name: "Recovery",
        exercises: [
          { name: "Light walking or stretching", sets: "20-30 min" },
          { name: "Mobility work", sets: "" },
        ],
      },
    ],
  },
};

const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const todayLabel = document.querySelector("#todayLabel");
const tabs = document.querySelectorAll("[data-tab]");
const screens = document.querySelectorAll("[data-screen]");
const profileButton = document.querySelector('[data-action="profile"]');
const todayContent = document.querySelector("#todayContent");
const scheduleContent = document.querySelector("#scheduleContent");
const heroTitle = document.querySelector("#heroTitle");
const heroStatus = document.querySelector("#heroStatus");
const topBar = document.querySelector("#topBar");
const tabBar = document.querySelector("#tabBar");
const startBtn = document.querySelector('[data-action="start"]');

const now = new Date();
const dayIndex = now.getDay();
const todayKey = dayKeys[dayIndex];
const todayWorkout = workouts[todayKey];

if (todayLabel) {
  todayLabel.textContent = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(now);
}

const STORAGE_KEY = "rep-run-history";

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveHistory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function purgeOld() {
  const data = loadHistory();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = getDateKey(cutoff);
  let changed = false;
  Object.keys(data).forEach((key) => {
    if (key < cutoffStr) {
      delete data[key];
      changed = true;
    }
  });
  if (changed) saveHistory(data);
}

function saveTodaySets() {
  const dateKey = getDateKey(now);
  const data = loadHistory();
  if (!data[dateKey]) data[dateKey] = { dayKey: todayKey, completed: false, sets: [] };
  data[dateKey].sets = [...setCheckboxes()].map((cb) => cb.checked);
  saveHistory(data);
}

function loadTodaySets() {
  const dateKey = getDateKey(now);
  const data = loadHistory();
  const entry = data[dateKey];
  if (entry && entry.sets) {
    const boxes = setCheckboxes();
    entry.sets.forEach((checked, i) => {
      if (boxes[i]) boxes[i].checked = checked;
    });
    if (entry.completed) {
      showWorkoutComplete();
      progressBtn.classList.add("finished");
      progressBtn.textContent = "Done";
      progressBtn.ariaLabel = "Workout complete";
    }
  }
}

function getWeekDates() {
  const week = [];
  const sunday = new Date(now);
  sunday.setDate(sunday.getDate() - now.getDay());
  dayKeys.forEach((key, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    week.push({ dayKey: key, date: d, dateKey: getDateKey(d) });
  });
  return week;
}

function showHome() {
  const home = document.querySelector('[data-screen="home"]');
  home.classList.add("active");
  topBar.hidden = true;
}

function showScreen(screenName) {
  if (screenName === "home") {
    showHome();
    updateTabHighlight("home");
    return;
  }

  screens.forEach((screen) => {
    if (screen.dataset.screen === "home") return;
    const isActive = screen.dataset.screen === screenName;
    screen.classList.toggle("active", isActive);
    if (isActive) {
      screen.classList.remove("animate-in");
      void screen.offsetWidth;
      screen.classList.add("animate-in");
    }
  });

  topBar.hidden = false;
  updateTabHighlight(screenName);
  if (screenName === "progress") renderProgress();
}

function updateTabHighlight(screenName) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === screenName;
    tab.classList.toggle("active", isActive);
    tab.toggleAttribute("aria-current", isActive);
  });
}

function renderExName(ex) {
  return ex.name;
}

function renderToday() {
  if (!todayContent) return;
  heroTitle.textContent = todayWorkout.name;
  heroStatus.textContent = todayKey === "sunday" ? "Rest day" : "Workout ready";

  let html = "";
  let exIndex = 0;
  todayWorkout.groups.forEach((group, gi) => {
    html += `<details class="muscle-group" ${gi === 0 ? "open" : ""}>`;
    html += `<summary class="muscle-heading"><span>${group.name}</span></summary>`;
    html += `<div class="muscle-exercises">`;
    group.exercises.forEach((ex) => {
      html += `
        <label class="set-row">
          <span class="ex-name">${renderExName(ex)}</span>
          <span class="ex-sets">${ex.sets}</span>
          <input type="checkbox" data-set="${exIndex}">
        </label>`;
      exIndex++;
    });
    html += `</div></details>`;
  });
  todayContent.innerHTML = html;
  loadTodaySets();
  updateProgress();
}

function renderSchedule() {
  if (!scheduleContent) return;
  const weekDates = getWeekDates();
  const history = loadHistory();
  let html = "";
  dayKeys.forEach((key) => {
    const w = workouts[key];
    const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
    const isToday = key === todayKey;
    const weekEntry = weekDates.find((wd) => wd.dayKey === key);
    const dayEntry = weekEntry ? history[weekEntry.dateKey] : null;
    const isDone = dayEntry && dayEntry.completed;
    const dateKey = weekEntry ? weekEntry.dateKey : "";
    html += `
      <details class="day-card ${isDone ? "done" : ""}" ${isToday ? "open" : ""}>
        <summary class="day-summary">
          <span class="day-name">${capitalized}</span>
          <button type="button" class="day-toggle" data-datekey="${dateKey}" data-done="${isDone}" aria-label="${isDone ? "Mark incomplete" : "Mark complete"}">
            ${isDone ? "✓" : "○"}
          </button>
          <span class="day-workout">${w.name}</span>
        </summary>
        <div class="day-exercises">
          ${w.groups.map((g) => `
            <div class="schedule-group">
              <div class="schedule-group-name">${g.name}</div>
              ${g.exercises.map((ex) => `
                <div class="day-exercise">
                  <span>${renderExName(ex)}</span>
                  <span class="ex-sets">${ex.sets}</span>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>
      </details>`;
  });
  scheduleContent.innerHTML = html;
  renderProgress();
}

function renderProgress() {
  const el = document.querySelector("#progressSummary");
  if (!el) return;
  const history = loadHistory();
  const weekDates = getWeekDates();
  let weekDone = 0;
  let totalDone = 0;
  const totalDays = Object.keys(history).length;
  weekDates.forEach((wd) => {
    if (history[wd.dateKey]?.completed) weekDone++;
  });
  Object.values(history).forEach((entry) => {
    if (entry.completed) totalDone++;
  });
  el.innerHTML = `
    <div class="stats-card">
      <div class="stat">
        <span class="stat-value">${weekDone}</span>
        <span class="stat-label">This week</span>
      </div>
      <div class="stat">
        <span class="stat-value">${totalDone}</span>
        <span class="stat-label">Total done</span>
      </div>
      <div class="stat">
        <span class="stat-value">${totalDays}</span>
        <span class="stat-label">Days logged</span>
      </div>
    </div>`;
}

const setCheckboxes = () => document.querySelectorAll("[data-set]");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const exerciseBadge = document.querySelector("#exerciseBadge");
const progressBtn = document.querySelector('[data-action="progress"]');
const workoutComplete = document.querySelector("#workoutComplete");
const goBackBtn = document.querySelector("#goBackBtn");
const exerciseCard = document.querySelector("#exerciseCard");

function updateProgress() {
  const boxes = setCheckboxes();
  const total = boxes.length;
  const done = [...boxes].filter((cb) => cb.checked).length;
  const label = `${done} / ${total} done`;
  if (progressText) progressText.textContent = label;
  if (exerciseBadge) exerciseBadge.textContent = label;
  if (progressFill) progressFill.style.width = total > 0 ? `${(done / total) * 100}%` : "0%";

  const allDone = total > 0 && done === total;
  progressBtn.classList.toggle("finished", allDone);
  progressBtn.textContent = allDone ? "Done" : "Go";
  progressBtn.ariaLabel = allDone ? "Workout complete" : "Progress to next exercise";
}

startBtn.addEventListener("click", () => {
  const home = document.querySelector('[data-screen="home"]');
  home.classList.remove("active");
  topBar.hidden = false;
  tabBar.hidden = false;
  showScreen("today");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showScreen(tab.dataset.tab));
});

profileButton.addEventListener("click", () => {
  showScreen("settings");
});

purgeOld();
renderToday();
renderSchedule();

document.addEventListener("change", (e) => {
  if (e.target.matches("[data-set]")) {
    updateProgress();
    saveTodaySets();
  }
});

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".day-toggle");
  if (!toggle) return;
  const dateKey = toggle.dataset.datekey;
  if (!dateKey) return;
  const data = loadHistory();
  const wasDone = toggle.dataset.done === "true";
  if (wasDone) {
    if (data[dateKey]) data[dateKey].completed = false;
  } else {
    if (!data[dateKey]) data[dateKey] = { dayKey: "", completed: false, sets: [] };
    data[dateKey].completed = true;
  }
  saveHistory(data);
  renderSchedule();
});

const themeToggle = document.querySelector("#themeToggle");
const themeLabel = document.querySelector("#themeLabel");

function applyTheme(isDark) {
  document.documentElement.classList.toggle("light-mode", !isDark);
  if (themeToggle) themeToggle.checked = isDark;
  if (themeLabel) themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
  localStorage.setItem("rep-run-dark", isDark);
}

themeToggle?.addEventListener("change", () => {
  applyTheme(themeToggle.checked);
});

const savedDark = localStorage.getItem("rep-run-dark");
applyTheme(savedDark !== "false");

progressBtn.addEventListener("click", () => {
  if (progressBtn.classList.contains("finished")) {
    const dateKey = getDateKey(now);
    const data = loadHistory();
    if (!data[dateKey]) data[dateKey] = { dayKey: todayKey, completed: false, sets: [] };
    data[dateKey].completed = true;
    data[dateKey].sets = [...setCheckboxes()].map((cb) => cb.checked);
    saveHistory(data);
    showWorkoutComplete();
    renderSchedule();
    return;
  }
  const unchecked = [...setCheckboxes()].find((cb) => !cb.checked);
  if (unchecked) {
    unchecked.checked = true;
    updateProgress();
  }
});

goBackBtn.addEventListener("click", () => {
  showWorkoutActive();
  setCheckboxes().forEach((cb) => { cb.checked = false; });
  updateProgress();
});

function showWorkoutComplete() {
  exerciseCard.hidden = true;
  progressBtn.hidden = true;
  workoutComplete.hidden = false;
  goBackBtn.hidden = false;
}

function showWorkoutActive() {
  exerciseCard.hidden = false;
  progressBtn.hidden = false;
  workoutComplete.hidden = true;
  goBackBtn.hidden = true;
}
