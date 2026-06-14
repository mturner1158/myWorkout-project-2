// FUNCTIONS - ALL FUNCTIONS ARE DEFINED HERE

/*
 * re-queries the table every time it is called
 */

function getTable() {
  return document.getElementById("workout-table");
}

/*
 * re-queries the table body every time it is called
 */

function getFormTBody() {
  return document.querySelector("#workout-table tbody");
}

/*
 * Gets values from the form and returns as an object
 */

function getFormValues(form) {
  return {
    exercise: form.querySelector('[name="exercise"]').value.trim(),
    weight: form.querySelector('[name="weight"]').value.trim(),
    reps: form.querySelector('[name="reps"]').value.trim(),
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
  const row = document.createElement("tr");
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
  row.querySelector(".remove-row").addEventListener("click", () => {
    row.remove();
    if (getFormTBody().querySelectorAll("tr").length === 0) {
      getTable().classList.add("invisible");
    }
  });
}

/*
 * replaces the table with the inputs with a success message
 */

function confirmTableSubmission() {
  const container = document.getElementById("submission-display");
  container.innerHTML = `
        <div class="alert alert-success text-center" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i>
            Workout logged successfully!
        </div>
    `;
}

function increaseCount(id) {
  const count = document.getElementById(id);
  count.textContent = parseInt(count.textContent) + 1;
}

// CONSTANTS AND EVENT LISTENERS - wrapped in init so DOM exists first

function init() {
  const form = document.getElementById("new-workout-form");
  const originalTable = document.getElementById("submission-display").innerHTML;

  /*
   * replaces the success message with the original table
   */
  function insertTable() {
    document.getElementById("submission-display").innerHTML = originalTable;
  }

  /*
   * on clicking the plus icon in the form this:
   * checks there are inputs in three fields and displays an alert if false
   * removes the invisible class from the table to make it visible
   * adds the form inputs as a new row
   * checks if the remove button has been clicked to perform that action
   * resets for form for another entry
   */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const values = getFormValues(this);
    if (!isValid(values)) {
      alert("Please fill in all three fields before submitting.");
      return;
    }

    getTable().classList.remove("invisible");

    const row = addTableRow(values);
    removeTableEntry(row);
    getFormTBody().appendChild(row);

    this.reset();
  });

  /*
   * on clicking the submit your workout button this does
   * checks if the table has values and displays an alert if false
   * creates an empty array with the exact date
   * records table entries into the array
   * displays a success message on clicking submit your workout
   * increases all the numbers at the top of the page on submission
   */
  document
    .getElementById("overall-submit-button")
    .addEventListener("click", function () {
      const rows = document.querySelectorAll("#workout-table tbody tr");

      if (rows.length === 0) {
        alert("Please add at least one exercise before submitting.");
        return;
      }

      const workout = {
        date: new Date().toISOString(),
        exercises: [],
      };

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        workout.exercises.push({
          exercise: cells[0].textContent,
          weight: parseFloat(cells[1].textContent),
          reps: parseInt(cells[2].textContent),
        });
      });

      console.log(workout);
      confirmTableSubmission();

      increaseCount("weekly-count");
      increaseCount("monthly-count");
      increaseCount("yearly-count");
      increaseCount("total-count");
    });

  /*
   * on clicking the reset button
   * removes success message
   * resets the display table with invisible class to allow resubmission of the form
   */
  document
    .getElementById("overall-reset-button")
    .addEventListener("click", function () {
      insertTable();
    });
}

document.addEventListener("DOMContentLoaded", init);


module.exports = { getFormValues, isValid, addTableRow, increaseCount, init };