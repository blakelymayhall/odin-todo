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

9/26/23-
- Work Item:
    - Add todo form 
    - Enforce name uniqueness in category creation

- Quality:
    - Enforce unable to make new category if exceed numbr of images/colors