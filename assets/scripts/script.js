// CONSTANTS - ALL CONSTANTS ARE DEFINED HERE

const form  = document.getElementById('new-workout-form'); //form elements
const table = document.getElementById('workout-table'); //invisible table
const formTBody = table.querySelector('tbody'); //the body of the table
const originalTable = document.getElementById('submission-display').innerHTML //html structure of the table 

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

/*
* replaces the table with the inputs with a success message
*/

function confirmTableSubmission() {
    const container = document.getElementById('submission-display'); 
    container.innerHTML = `
        <div class="alert alert-success text-center" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i>
            Workout logged successfully!
        </div>
    `;
}

/*
* replaces the success message with the original table
*/

function insertTable() {
    document.getElementById('submission-display').innerHTML = originalTable;
}

// EVENT LISTENERS - ALL EVENT LISTERNERS ARE DEFINED HERE

/*
* on clicking the plus icon in the form this:
* checks there are inputs in three fields and displays an alert if false
* removes the invisible class from the table to make it visible 
* adds the form inputs as a new row 
* checks if the remove button has been clicked to perform that action
* resets for form for another entry
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


/*
* on clicking the submit your workout buttion this does
* checks if the table has values and displays an alert if false 
* creates an empty array with the exact date
* records table entries into the array 
* displays a sucess message on clicking submit your workout 
*/

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

document.getElementById('overall-reset-button').addEventListener('click', function() 
{
    insertTable();
})

