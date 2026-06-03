// CONSTANTS - ALL CONSTANTS ARE DEFINED HERE

const form  = document.getElementById('new-workout-form'); //form elements
const table = document.getElementById('workout-table'); //invisible table
const formTBody = table.querySelector('tbody'); //the body of the table

//FUNCTIONS - ALL FUNCTIONS ARE DEFINED HERE

/*
* Gets values from the form and returns as an object
*/

function getFormValues(form) {
    return {
        exercise: form.querySelector('[name="exercise"]').value.trim(),
        weight:   form.querySelector('[name="weight"]').value.trim(),
        reps:     form.querySelector('[name="reps"]').value.trim(),
    };
}

/*
* returns the three form input fields appended
*/

function isValid({ exercise, weight, reps }) {
    return exercise && weight && reps;
}

/*
* adds the form inputs to the table in the workout tile div 
* removes the invisible tag if this is the first row to make the table visible 
*/

function addTableRow({ exercise, weight, reps }) {
    const row = document.createElement('tr');
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
    return row;
}

/*
* removes a row when the remove button is clicked
* if there are no rows remaining in the table it will add the invisible class again
*/

function removeTableEntry(row) {
    row.querySelector('.remove-row').addEventListener('click', () => {
        row.remove();
        if (formTBody.querySelectorAll('tr').length === 0) {
            table.classList.add('invisible');
        }
    });
}

function confirmTableSubmission() {
    const container = document.getElementById('submission-display'); 
    container.innerHTML = `
        <div class="alert alert-success text-center" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i>
            Workout logged successfully!
        </div>
    `;
}

function resetWorkoutForm() {
    formTBody.innerHTML = '';
    table.classList.add('invisible');
    form.reset();
}

// EVENT LISTENERS - ALL EVENT LISTERNERS ARE DEFINED HERE

/*
* 
*/

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const values = getFormValues(this);
    if (!isValid(values)) {
        alert('Please fill in all three fields before submitting.');
        return;
    }

    table.classList.remove('invisible');

    const row = addTableRow(values);
    removeTableEntry(row);
    formTBody.appendChild(row);

    this.reset();
});


document.getElementById('overall-submit-button').addEventListener('click', function() {
    const rows = document.querySelectorAll('#workout-table tbody tr');

    if (rows.length === 0) {
        alert('Please add at least one exercise before submitting.');
        return;
    }

    const workout = {
        date: new Date().toISOString(),
        exercises: []
    };

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        workout.exercises.push({
            exercise: cells[0].textContent,
            weight: parseFloat(cells[1].textContent),
            reps: parseInt(cells[2].textContent)
        });
    });

    console.log(workout);
    confirmTableSubmission();
});

