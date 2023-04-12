This project is an implementation of a basic CRUD App which allows user to maintain clients database by adding, updatind and deleting items from database. (Please note: this App has backend part which was not originally developed by me as it was provided by school)

Key features:
The App allows to read, create, update and delete data from database.
The App allows to add up to 10 different contact fields for each item in database. Contact options are predifined as select list.
The App provides basic validation on the client side for creating new client (only latin alphabet is allowed for name fields, test for "@" for email, adding capital first letter to name fields on "blur" event)
Search through database is available. It allows to find any matches for particular filled in request including search through contact info. There is a predifined time gap for 3 seconds to start search once user ends typing the request
Header cells of the table are clickable and allow to sort stored data according to its textcontent. The first click is for ascending sorting and the second one is for asdending.The third click resets sort to default which is descending sorting on id

To launch the application, you need to download it, go to the server folder and run 'node index' in the console (nodeJS is necessary for the correct operation of the server).

Additional UI features:
By default it's shown 4 contact options on the table for each client and a clickable indicator of the rest options. Which shows all contact info on click.
Contact information is displayed in tooltip on hover event
There is a loader indicator to allow to fetch data from API.

Used technologies:
1. Vanilla JavaScript.
2. HTML / CSS.
