# Project 2: MyWokrout
A website that allows users to add their workouts and track their progress. 

## Table of Contents 

(links to add)

## Project Goals
This web application allows a user to track their workouts that they would undertake at the gym and track their progress. A user can use the dashboard page to input their workout and submit this to be added to their statistics. 

### User Goals
Users have the following goals: 
* Add in their workout stats
* View how many workouts they have done in the past week, month, year and overall
* Look at recent exercises they have done
* Track previous workouts they have submitted

### Site Goals
Site managers hae the following goals: 
* build a database of workouts 
* look at statistics of common exercises

## User Expereince 
This section shows the considerations for each type of user that would use the website and the exeriences they would have.

### Target Audience
The target audience is any user that wants to track their workouts over a period of time. 

### Expectations
Users of the site can expect:
* Easy to use navigation
* Clear layout
* Links to everything described
* Responsiveness to view the site on any device
* An easy way to contact the site owners 

### User Stories
The following user stories have been considered:

**User 1: Workout Logging**
This user should expect to: 

* Add each exercise of their workout
* Submit their exercises
* See confirmation of their workout submission
* View how many workouts they have done over different time periods

**User 2: Workout Tracking**
This user should expect to:

* See previously submitted workouts
* Ordered an a navigatable way

## Design
This section shows the design choices I made as part of the design of this website, alongside wireframes to show the rough layout of each page before construction of the website.

### Fonts, Colours and Structure
The colour theme of this site is as follows:

|Colour|Hex Code|Description   |
|:-----|:-------|:-------------|
|Electric Aqua  |#86E8EA |Primary Colour|
|Platinum|#ECE9EC |Primary Background Colour|
|Blue Slate|#495867 |Secondary Colour|
|Oxidised Iron|#B02E0C|Secondary Background Colour|
|Yellow Green|#B0D50B|Secondary Background Colour|

There are two fonts used through this site:

1. Hind is the primary font used for main bodies of text
2. Monserrat is the secondary font and is used for headers and important bits of text

The site will have an easy to follow structure with a standardised navigation bar across all pages to allow users to find the information they need. This web application consists of two pages.

1. A home page (labeled My Dashboard) allowing users to submit their workouts and view key statistics
2. A page showing previous workouts

### Wireframes
This section shows the wireframes for each page created in this website, across small, medium and large screens from left to right.

#### Dashboard

<img src="assets/images/wireframe-home-page.png">

#### History

<img src="assets/images/wireframe-history.png">

## Frameworks & Languages
This section highlights all the langauges and frameworks used in this seciton.

The following languages are used in this project:

* HTML
* CSS
* JavaScript

The following frameworks are used in this project: 

* Bootstrap v5.3.8
* Github
* Google Fonts
* Font Awesome
* JQuery
* JEST (if testing - REMOVE IF NOT)

## Features
This section outlines the key features on each page. 

### Common Features
Common features across all pages on this site include the navigate bar and the footer. 

#### Navigation Bar
The navigation bar is featured on all pages, and aims to:

* Consistant styling and position for each of use 
* Responsive design across small, medium and large screens

<img src="assets/images/feature-navbar.png">

#### Footer
The footer is featured across all pages, and aims to:

* provide links to common social media sites 

<img src="assets/images/feature-footer.png">

### Dashboard
The dashboard page as two key sections which cover a number of features:

#### Feature 1: Workout Counting
**What this does:**
This feature shows the number of workouts that would currently be logged on the website in the last week, last month, last year and all time. In this case, the orignal numbers when the page loads are hard coded as there is no back end storage for this site.

**How it works:** 
Once a user inputs a workout using features 2-4, the data is logged as an object and an iteration calculation updates each number. 

**User Stories:**
This satisfies User 1. 

<img src="assets/images/feature-workout-count.png">

#### Feature 2: Workout Input
**What this does:**
This feature allows the user to add in the name of an exercise, the weight in kilograms and the number of reps for each workout. Once satisfied, users can hit the plus to add this data to a table to view.

**How it works:** 
This uses a standard HTML input form with a text input and two numerical inputs. Javascript is used to take the form inputs and add them to a table which is invisible until the first submission.

**User Stories:**
This satisfies User 1.

<img src="assets/images/feature-input-form.png">

#### Feature 3: Workout Logging
**What this does:**
This features shows the data which the user has already submitted. The user can add as many rows as they please. If a user has made an error, they can use the red icon in the remove column to remove the row and reinput the correct information using the form again. 

**How it works:** 
This uses Javascript functions to add an event listener to record when the red remove icon is clicked to remove a row or when the form submission icon is clicked to add the row.

**User Stories:**
This satisfies User 1.

<img src="assets/images/feature-input-table.png">

#### Feature 4: Workout Submission
**What this does:**
This feature takes all the rows of the table and creates an object with the submission date and the inputted information. This also increases the counts in Feature 1. Once submitted, a success message appears to asure users that this is recorded. Users can then use the reset button to submit another workout. 

**How it works:** 
This users a mixture of event listeners and functions to ensure the object is logged. Functions ensure this can be reset and multiple workotus can be submitted as objects and the count can keep increasing. 

**User Stories:**
This satisfies User 1. 

<img src="assets/images/feature-workout-submit.png">

### History
The history page has one main feature:

#### Feature 5: Historic Workouts
**What this does:**
Displays past workouts. In this case, the workouts are randomly generated with a date from 1st January 2024 to present day from a list of 10 exercises as there is no back end storage. These are ordered fom most recent to least recent.

**How it works:** 
Using a script, we generate 15 objects containing a randomised date, 5 exercises with weight and reps fro each. Then we generate a card for each object and add these to the DOM to be displayed for the user. 

**User Stories:**
This satisfies User 2.

<img src="assets/images/feature-history-cards.png">

## Testing

## Bugs
The following bugs occured during the design of this site: 

|ID|Bug|Fix   |
|:-----|:-------|:-------------|
|1|Table was not spaced properly on first page|Changed table width to 100%|
|2|Form spacing would not work |STILL NEED TO FIX|
|3|Could not right align home page on a large screen|Container classes were not implemented correctly and have now been changed|
|4|Date was undefined on My Workouts page|Typo in call for date|
|5|Footer would not stick to the bottom of the page|STILL NEED TO FIX|
|6|On success the table to collect the form entries would not reappear|Added in a new function to add the code for the invisible table after clicking reset|
|7|Didnt add multiple objects to the recordings|Wokrouts were stored in an array|
|8|Upon clicking reset, you could not submit another form|Table and Tbody constants became functions that store values at the page load|
|9|Padding did not get added horizontally for history cards|INtriduced a separate div for the cards on the histroy page|

## Deployment
This website is deployed using GitHub Pages by using the following method: 

1. Open up the github repository
2. Navigate to the Settings tab
3. Select the pages option in the 'Code and Automation' section
4. For the source choose 'deploy from branch'
5. For branch, choose main
6. After the webpage refreshes, the ribbon will say "Your site is live at https://mturner1158.github.io/myWorkout-project-2/"

## Code from External Sources

## Credits and Disclaimer