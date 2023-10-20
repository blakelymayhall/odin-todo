# odin-todo
Repo for the todo list project in the javascript course of the Odin Project

## Process  

- As always, my first step will be designing the UI via freeform and text  

### Design 

- The todos themselves will be made up of:
    - Category (assign icons)
    - Title
    - Description
    - Due Date
    - Repeat?
- I am thinking cards in a grid style
- Thought of the name 'bullitin board' and that will influence the design as well
- <img src="design/Screenshot 2023-09-21 at 8.36.29 PM.png">

### Progress

9/21/23-9/24/23
- Implementing html to achieve above "macro" design -- revisit freeform for subdesigns (forms for entry, on-click todo)

9/24/23-9/25/23
- Finished the HTML/CSS design, now work on implementing into JS and using webpack
- Got the assets and the shell organized how I'd like... now break into chunks and decide how to implement 

- Work Item:
    - Add Todo Item Functionality:
        - Only use default category for now
        - Should generate a 'Todo' object and append it to a running list of these objects
        - Opens a form for the user to input the data 
            - When form is validated and closed, the todo should appear on the screen 
    - Add Category Functionality:
        - Should generate a ''Category' object and append it to a running list of these objects
        - Opens a form for the user to input the data 
            - When form is validated and closed, the category should appear on the screen

- Reviewing the above, I need:
    - A 'Todo' object - todo_manager.js
        - Todo object will have fields for:
            - Title
            - Description
            - Due Date
            - Category
            - Completed
    - A 'Category' object - todo_manager.js
        - Category object will have field for:
            - Title
            - Color
            - Symbol
    - A running list of both of the above objects - main.js
    - A DOM manipulator - index.js

- Got most of the above implemented. Running out of steam, need to re-group on priorities.

9/26/23-9/29/23
- Added todo input form  
- Add category icon randomization 
- Add category color randomization
- Add functions to add the categories and todos to DOM so that the defult category isn't hardcoded in
- Add due date functionality 
- Added git ignore 

10/2/23
- Make todo's clickable and bring up the information

10/3/23
- Add close button functionality to the full todo view
- Add completed button to the todo's
- Add edit test form

10/6/23
- Finish todo's editable 
- Issue with making a second todo - form validation
    - its because you are adding additional event listners. move to main.js
- Move the form event listeners to the main.js script with the document.eventlistener strategy

10/8/23
- Add delete todo button to the todo edit form
- refactor code so that main executes the manage functions rather than the dom manager doing it

10/9/23
- Fixed the categories functionality

10/11/23
- Start to implement edit category

10/14/23
- Major refactoring of code for clarity and readability

10/15/23 - 10/18/23
- Todo edit category does work, but needed update so that the category image and color is updated
- Nearly finished adding edit category functionality. 
    - It was bigger than I thought, since you have to also update the board of todos after submission
    - Added color and icon picker
- Get the todo board updated after edit category
    - Allow no selection of color / icon 
    - Delete functionality
    - Remove/Add colors and symbols
- Refactor to use the new getCategoryBeingEdited function
    - Do the same for todos

10/19/23
- Cannot delete categories if existing todos
- Prevent clicking buttons while in form
- If due date is passed, make red 
    - Use the timer to run this code
- Help button
- Begin implementing data persistance 

Todo:
- Move help to toolbarDomManager
- Move addTodo to toolbarDomManager
- Make data persist
- Sort functionality - toolbarDomManager
    - Sort by date 
    - Sort by name 
- Completed functionality
    - Hover over and make green - css
    - Todo disappears on click - toolbarDomManager
- Filter functionality - toolbarDomManager
    - No filter
    - Filter by category
    - Filter by completed
- Search functionality - toolbarDomManager
    - This is the same as filter but by name only 
- Enforce unable to make new category if exceed numbr of images/colors - categoryManager
- Add settings to the page settings - toolbarDomManager
    - Clear data -- categoryManager / todoManager

Not Neccessary, but Nice:
- Focus on input to allow tabbing
- Enforce name uniqueness in category creation
- Protect the default category

Code Quality:
- Consider splitting out the event listeners into more specific categories (in own files?)
- Fix name v. title in todo and category uses (coding style)

Notes:
- Understand better why I had to use "this" for the todoBeingEdited but not the todos or categories 
    - Arrays are passed by reference in js, but primatives aren't. 
    - So thats why you can access the updated arrays for the todos and categories but not the single "todoBeingEdited." 
    - Its still fuzzy because this is an odd quirk, but maybe just switch to using classes when this is over
    