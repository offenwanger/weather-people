

# Weather People's Voice User Interface Wizard of Oz system
This is a system developed by the Designing for People Project Course team Mohi Reza, Anna Offenwanger, and Nick Hetherington at the University of British Columbia in the winter 2019 semester. 

This system simluates a Voice User Interface in testing scenarios. Please see https://dfp.ubc.ca/ for information about DFP at UBC, and https://www.youtube.com/watch?v=1DTO5B46ElM for more information about the course project.

## Installation
- Install node.js and npm - (accessed May 2019) https://nodejs.org/en/download/
- Navigate to the folder with app.js in it
```bash
npm install express
```
then 
```bash
npm install socket.io
```

## Running and use
To run the application, execute 
```bash
node app.js
```
This will start the server on port 3000. 

The user view is the landing page, usually http://localhost:3000/

The wizard view is typically found at http://localhost:3000/typer

After the user clicks accept on the user view popup, any text typed into the wizard view and sent will be spoken by the user's browser.

## Useful technical notes

When the user first opens the webpage, they see a consent form. The form serves two purposes, one to ensure the user understands what study they are participating in, secondly clicking accept creates a page activation, which is necessary to enable voice synthesis on Chrome. 

To customize the set of canned phrases, edit the local_files/typer.html file. 

This application was designed for use in Chrome 74