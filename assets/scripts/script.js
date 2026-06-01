
// IMPORTS

// CONSTANTS

// STATED VARIABLES

// HELPER FUNCTIONS

// CORE FUNCTIONS

// DOM FUNCITONS

// EVENT HANDLERS



document.getElementById('new-workout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const exercise = this.querySelector('[name="exercise"]').value.trim();
    const weight   = this.querySelector('[name="weight"]').value.trim();
    const reps     = this.querySelector('[name="reps"]').value.trim();

    // Validate all fields are filled
    if (!exercise || !weight || !reps) {
        alert('Please fill in all three fields before submitting.');
        return;
    }

    // Make table visible (removes Bootstrap's 'invisible' class)
    const table = document.getElementById('workout-table');
    table.classList.remove('invisible');

    // Build and append new row
    const tbody = table.querySelector('tbody');
    const row   = document.createElement('tr');
    row.innerHTML = `
        <td>${exercise}</td>
        <td>${weight}</td>
        <td>${reps}</td>
        <td>
            <button class="btn btn-sm btn-danger remove-row">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(row);

    // Wire up the remove button for this new row
    row.querySelector('.remove-row').addEventListener('click', function() {
        row.remove();
        // Hide table again if no rows remain
        if (tbody.querySelectorAll('tr').length === 0) {
            table.classList.add('invisible');
        }
    });

    // Reset the form
    this.reset();
});


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