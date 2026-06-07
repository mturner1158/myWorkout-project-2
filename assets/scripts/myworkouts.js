// creates an array of 10 exercises to be used to randomly generate workouts
const exercises = [
  "Calf Raise", "Squat", "Lunge", "Chest Press", "Bench Press",
  "Deadlift", "Shoulder Press", "Bent-Over Row", "Biceps Curl", "Triceps Dip"
];

// Select the tbody inside the div
const workoutHistoryTbody = document.querySelector('.workout-history-card tbody');

// Loop through the exercises and build a row for each
const historyRow = document.querySelector('#workout-history-display .row');



// function to generate a random date

function randomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB'); // formats as DD/MM/YYYY
}

/*
* generates a set of 15 exercsises in an object to use in the workout history section
* sorts the dates and relabels the arrays by date order 
*/

const generatedWorkouts = Array.from({ length: 15 }, (_, i) => ({
  Workout: i + 1,
  Date: randomDate(new Date(2024, 0, 1), new Date()),
  Exercises: Array.from({ length: 5 }, () => ({
    Exercise: exercises[Math.floor(Math.random() * exercises.length)],
    Weight: parseFloat((Math.random() * 100 + 20).toFixed(1)),
    Reps: Math.floor(Math.random() * 12) + 3
  }))
}))
.sort((a, b) => new Date(b.Date.split('/').reverse().join('-')) - new Date(a.Date.split('/').reverse().join('-')))
.map((workout, i) => ({ ...workout, Workout: i + 1 }));

console.log(generatedWorkouts);

// generates cards based on the carrer which was generated in the previous constants

if (historyRow) {
  generatedWorkouts.forEach(workout => {
    const card = document.createElement('div');
    card.classList.add('col-12', 'col-md-6', 'col-lg-4');

    card.innerHTML = `
    <div class='workout-history-card'>
      <h2>Workout ${workout.Workout}</h2>
      <p>Date: <span>${workout.Date}</span></p>
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
    </div>
    `;

    historyRow.appendChild(card);
  });
}