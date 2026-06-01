// generates a set of 15 exercsises in an object to use in the workout history section

const exercises = [
  "Calf Raise", "Squat", "Lunge", "Chest Press", "Bench Press",
  "Deadlift", "Shoulder Press", "Bent-Over Row", "Biceps Curl", "Triceps Dip"
];

const generatedWorkouts = Array.from({ length: 15 }, (_, i) => ({
  Workout: i + 1,
  Exercises: Array.from({ length: 5 }, () => ({
    Exercise: exercises[Math.floor(Math.random() * exercises.length)],
    Weight: parseFloat((Math.random() * 100 + 20).toFixed(1)),
    Reps: Math.floor(Math.random() * 12) + 3
  }))
}));

console.log(generatedWorkouts);

// adds the first object to the workout-hitory tile

const firstWorkout = generatedWorkouts[0];

// Select the tbody inside the div
const workoutHistoryTbody = document.querySelector('.workout-history-card tbody');

// Select the date span
// const dateSpan = document.querySelector('.workout-history-card span');
// dateSpan.textContent = firstWorkout.Date;

// Loop through the exercises and build a row for each
firstWorkout.Exercises.forEach(exercise => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${exercise.Exercise}</td>
    <td>${exercise.Weight}</td>
    <td>${exercise.Reps}</td>
  `;

  workoutHistoryTbody.appendChild(row);
});