/**
 * @jest-environment jsdom
 */

const { getFormValues, isValid, addTableRow, increaseCount, init } = require('../script');

beforeEach(() => {
    document.body.innerHTML = `
        <div id="stats">
            <span id="weekly-count">0</span>
            <span id="monthly-count">0</span>
            <span id="yearly-count">0</span>
            <span id="total-count">0</span>
        </div>

        <form id="new-workout-form">
            <input name="exercise" />
            <input name="weight" />
            <input name="reps" />
            <button type="submit">Add</button>
        </form>

        <div id="submission-display">
            <table id="workout-table" class="invisible">
                <tbody></tbody>
            </table>
        </div>

        <button id="overall-submit-button">Submit Workout</button>
        <button id="overall-reset-button">Reset</button>
    `;

    init(); // attaches event listeners after DOM is ready
});

// functions to help testing

function fillForm(exercise = 'Squat', weight = '100', reps = '10') {
    document.querySelector('[name="exercise"]').value = exercise;
    document.querySelector('[name="weight"]').value   = weight;
    document.querySelector('[name="reps"]').value     = reps;
}

function submitForm() {
    document.getElementById('new-workout-form').dispatchEvent(
        new Event('submit', { bubbles: true })
    );
}

function clickOverallSubmit() {
    document.getElementById('overall-submit-button').click();
}

function clickReset() {
    document.getElementById('overall-reset-button').click();
}

// get the values from the form

describe('getFormValues()', () => {
    test('returns correct values from filled form fields', () => {
        fillForm('Deadlift', '140', '5');
        const form   = document.getElementById('new-workout-form');
        const values = getFormValues(form);
        expect(values).toEqual({ exercise: 'Deadlift', weight: '140', reps: '5' });
    });

    test('trims whitespace from inputs', () => {
        document.querySelector('[name="exercise"]').value = '  Bench Press  ';
        document.querySelector('[name="weight"]').value   = ' 80 ';
        document.querySelector('[name="reps"]').value     = ' 8 ';
        const form   = document.getElementById('new-workout-form');
        const values = getFormValues(form);
        expect(values).toEqual({ exercise: 'Bench Press', weight: '80', reps: '8' });
    });

    test('returns empty strings when fields are blank', () => {
        const form   = document.getElementById('new-workout-form');
        const values = getFormValues(form);
        expect(values).toEqual({ exercise: '', weight: '', reps: '' });
    });
});

// ensuring a submission using the form is valid

describe('isValid()', () => {
    test('returns true when all three fields are populated', () => {
        expect(isValid({ exercise: 'Run', weight: '0', reps: '1' })).toBeTruthy();
    });

    test('returns false when exercise is missing', () => {
        expect(isValid({ exercise: '', weight: '50', reps: '10' })).toBeFalsy();
    });

    test('returns false when weight is missing', () => {
        expect(isValid({ exercise: 'Press', weight: '', reps: '10' })).toBeFalsy();
    });

    test('returns false when reps is missing', () => {
        expect(isValid({ exercise: 'Press', weight: '60', reps: '' })).toBeFalsy();
    });

    test('returns false when all fields are empty', () => {
        expect(isValid({ exercise: '', weight: '', reps: '' })).toBeFalsy();
    });
});

// adding a row to the table

describe('addTableRow()', () => {
    test('returns a <tr> element', () => {
        const row = addTableRow({ exercise: 'Pull-up', weight: '0', reps: '12' });
        expect(row.tagName).toBe('TR');
    });

    test('renders exercise, weight, and reps in the correct cells', () => {
        const row   = addTableRow({ exercise: 'Curl', weight: '20', reps: '15' });
        const cells = row.querySelectorAll('td');
        expect(cells[0].textContent).toBe('Curl');
        expect(cells[1].textContent).toBe('20');
        expect(cells[2].textContent).toBe('15');
    });

    test('includes a remove button with the correct classes', () => {
        const row    = addTableRow({ exercise: 'Lunge', weight: '30', reps: '12' });
        const button = row.querySelector('.remove-row');
        expect(button).not.toBeNull();
        expect(button.classList.contains('btn-danger')).toBe(true);
    });
});

// submitting a new exercise using the form

describe('Form submit event', () => {
    test('adds a row to the table on valid submission', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        const rows = document.querySelectorAll('#workout-table tbody tr');
        expect(rows.length).toBe(1);
    });

    test('makes the table visible on first valid submission', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        expect(document.getElementById('workout-table').classList.contains('invisible')).toBe(false);
    });

    test('resets the form fields after a valid submission', () => {
        fillForm('Press', '60', '10');
        submitForm();
        expect(document.querySelector('[name="exercise"]').value).toBe('');
        expect(document.querySelector('[name="weight"]').value).toBe('');
        expect(document.querySelector('[name="reps"]').value).toBe('');
    });

    test('does not add a row when fields are empty', () => {
        submitForm();
        const rows = document.querySelectorAll('#workout-table tbody tr');
        expect(rows.length).toBe(0);
    });

    test('accumulates multiple rows correctly', () => {
        fillForm('Squat', '100', '8');    submitForm();
        fillForm('Press', '60',  '10');   submitForm();
        fillForm('Deadlift', '120', '5'); submitForm();
        const rows = document.querySelectorAll('#workout-table tbody tr');
        expect(rows.length).toBe(3);
    });
});

// removing a row from the generated table

describe('Row remove button', () => {
    test('removes a row when the remove button is clicked', () => {
        fillForm('Row', '70', '10');
        submitForm();
        document.querySelector('.remove-row').click();
        const rows = document.querySelectorAll('#workout-table tbody tr');
        expect(rows.length).toBe(0);
    });

    test('re-hides the table when the last row is removed', () => {
        fillForm('Row', '70', '10');
        submitForm();
        document.querySelector('.remove-row').click();
        expect(document.getElementById('workout-table').classList.contains('invisible')).toBe(true);
    });

    test('only removes the targeted row, leaving others intact', () => {
        fillForm('Squat', '100', '8');  submitForm();
        fillForm('Press', '60',  '10'); submitForm();
        document.querySelectorAll('.remove-row')[0].click();
        const rows = document.querySelectorAll('#workout-table tbody tr');
        expect(rows.length).toBe(1);
        expect(rows[0].querySelector('td').textContent).toBe('Press');
    });
});

// overall submit button

describe('Overall submit button', () => {
    test('shows a success alert when at least one exercise exists', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        expect(document.querySelector('.alert-success')).not.toBeNull();
    });

    test('replaces the table with the success message on submit', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        expect(document.getElementById('workout-table')).toBeNull();
    });

    test('does not show success message when table is empty', () => {
        clickOverallSubmit();
        expect(document.querySelector('.alert-success')).toBeNull();
    });

    test('increments all four counters on successful submit', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        expect(document.getElementById('weekly-count').textContent).toBe('1');
        expect(document.getElementById('monthly-count').textContent).toBe('1');
        expect(document.getElementById('yearly-count').textContent).toBe('1');
        expect(document.getElementById('total-count').textContent).toBe('1');
    });

    test('does not increment counters when table is empty', () => {
        clickOverallSubmit();
        expect(document.getElementById('total-count').textContent).toBe('0');
    });
});

// increase count function

describe('increaseCount()', () => {
    test('increments the element text by 1', () => {
        document.getElementById('total-count').textContent = '5';
        increaseCount('total-count');
        expect(document.getElementById('total-count').textContent).toBe('6');
    });

    test('handles incrementing from 0', () => {
        increaseCount('weekly-count');
        expect(document.getElementById('weekly-count').textContent).toBe('1');
    });
});

// Reset button functionality

describe('Reset button', () => {
    test('restores the original table structure after a successful submit', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        clickReset();
        expect(document.getElementById('workout-table')).not.toBeNull();
    });

    test('restored table starts with invisible class (no leftover rows)', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        clickReset();
        expect(document.getElementById('workout-table').classList.contains('invisible')).toBe(true);
    });

    test('removes the success alert on reset', () => {
        fillForm('Squat', '100', '8');
        submitForm();
        clickOverallSubmit();
        clickReset();
        expect(document.querySelector('.alert-success')).toBeNull();
    });
});