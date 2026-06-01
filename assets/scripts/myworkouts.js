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

// Select the tbody inside the div
const workoutHistoryTbody = document.querySelector('.workout-history-card tbody');

// Select the date span
// const dateSpan = document.querySelector('.workout-history-card span');
// dateSpan.textContent = firstWorkout.Date;

// Loop through the exercises and build a row for each
const historyRow = document.querySelector('#workout-history-display .row');

if (historyRow) {
  generatedWorkouts.forEach(workout => {
    const card = document.createElement('div');
    card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'workout-history-card');

    card.innerHTML = `
      <h2>Workout ${workout.Workout}</h2>
      <p>Date: <span>12/09/2024</span></p>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Weight (kg)</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          ${workout.Exercises.map(exercise => `
            <tr>
              <td>${exercise.Exercise}</td>
              <td>${exercise.Weight}</td>
              <td>${exercise.Reps}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    historyRow.appendChild(card);
  });
}