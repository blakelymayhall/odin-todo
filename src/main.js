import { DomManager } from "./domManager";
import { Manager } from './manager';
import "./style/styles.css";

// Initial setup
/////////////////////////////////////////////////////////////////////////////
const manager = Manager();
const domManager = DomManager();

if (manager.loadState()) {
    manager.categoryManager.categories.forEach( (category) => {
        domManager.categoryDomManager.addCategoryToDOM(category);
    });
    manager.todoManager.todos.forEach( (todo) => {
        domManager.todoDomManager.addTodoToDOM(manager, todo);
    });
} else {
    domManager.categoryDomManager.addCategoryToDOM(manager.categoryManager.addCategory("Default"));

    domManager.todoDomManager.addTodoToDOM(
        manager, 
        manager.todoManager.addTodo( {
            newTodoName: "Click Me!",
            newTodoDescription: "",
            newTodoDueDate: new Date(),
            newTodoCategory: manager.categoryManager.getCategoryByName("Default")}
        )
    );
}

// Click events
/////////////////////////////////////////////////////////////////////////////
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.toggleButtons();
    domManager.categoryDomManager.getNewCategory();
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.toggleButtons();
    domManager.toolbarDomManager.openNewTodoForm(manager);
});

const sortButton = document.querySelector("#sortButton");
sortButton.addEventListener("click", () => {
    domManager.toggleButtons();
    document.getElementById("sortButton-content").style.display = "block";
});

const filterButton = document.querySelector("#filterButton");
filterButton.addEventListener("click", () => {
    domManager.toggleButtons();
    document.getElementById("filterButton-content").style.display = "block";
});

const helpButton = document.querySelector("#helpButton");
helpButton.addEventListener("click", () => {
    domManager.toggleButtons();
    domManager.toolbarDomManager.openHelpMessage();
});

// Dynamic Click Events (for elements that are not always visible)
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
    
    // Todo Completed
    /////////////////////////////////////////////////////////
    let todoCompleted = e.target.closest(".todoCheckButton");
    if (todoCompleted) {
        const todo = manager.todoManager.getTodoByID(todoCompleted.parentNode.parentNode.dataset.todoID);
        domManager.todoDomManager.setTodoComplete(todo);
        manager.todoManager.setTodoComplete(todo);
        return;
    }
    /////////////////////////////////////////////////////////

    // Edit Todo
    /////////////////////////////////////////////////////////
    let openEditTodoForm = e.target.closest(".todoEditButton");
    if (openEditTodoForm) {
        domManager.toggleButtons();
        const todo = manager.todoManager.getTodoByID(openEditTodoForm.parentNode.parentNode.dataset.todoID);
        domManager.todoDomManager.openEditTodoForm(manager, todo);
        return;
    };

    let submitEditTodoForm = e.target.closest("#editTodoConfirmForm"); 
    if (submitEditTodoForm) {
        const todoBeingEdited = domManager.todoDomManager.getTodoBeingEdited();
        const editedTodoFields = domManager.todoDomManager.submitEditTodoForm(manager);
        manager.todoManager.updateTodo(todoBeingEdited, editedTodoFields);
        domManager.toggleButtons();
        return;   
    }

    let closeEditTodoForm = e.target.closest("#editTodoCloseForm"); 
    if (closeEditTodoForm) {
        domManager.todoDomManager.closeEditTodoForm();
        domManager.toggleButtons();
        return;   
    }

    let deleteTodoViaEditTodoForm = e.target.closest("#editTodoDeleteTodo"); 
    if (deleteTodoViaEditTodoForm) {
        const todoToDelete = domManager.todoDomManager.getTodoBeingEdited();
        domManager.todoDomManager.deleteTodoViaEditForm();
        manager.todoManager.deleteTodo(todoToDelete);
        domManager.toggleButtons();
        return;   
    }
    /////////////////////////////////////////////////////////

    // Full Todo
    /////////////////////////////////////////////////////////
    let showFullTodo = e.target.closest(".todoNote");
    if (showFullTodo) {
        domManager.toggleButtons();
        const todo = manager.todoManager.getTodoByID(showFullTodo.dataset.todoID);
        domManager.todoDomManager.showFullTodo(manager, todo);
        return;
    };

    let closeFullTodo = e.target.closest("#todoFullOverlayCloseButton");
    if (closeFullTodo) {
        domManager.todoDomManager.closeFullTodo();
        domManager.toggleButtons();
        return;
    };
    /////////////////////////////////////////////////////////

    // New Todo
    /////////////////////////////////////////////////////////
    let closeNewTodoForm = e.target.closest("#newTodoCloseForm");
    if (closeNewTodoForm) {
        domManager.toggleButtons();
        domManager.toolbarDomManager.closeNewTodoForm();
        return;
    }

    let submitNewTodoForm = e.target.closest("#newTodoConfirmForm");
    if (submitNewTodoForm) {        
        const newTodoFields = domManager.toolbarDomManager.submitNewTodoForm(manager);
        const newTodo = manager.todoManager.addTodo(newTodoFields);
        domManager.todoDomManager.addTodoToDOM(manager, newTodo);
        domManager.toggleButtons();
        return;
    };
    /////////////////////////////////////////////////////////

    // Edit Category
    /////////////////////////////////////////////////////////
    let openEditCategoryForm = e.target.closest(".editCategoryButton"); 
    if (openEditCategoryForm) {
        domManager.toggleButtons();
        const categoryID = openEditCategoryForm.parentNode.parentNode.dataset.categoryID;
        const category = manager.categoryManager.getCategoryByID(categoryID);
        domManager.categoryDomManager.openCategoryEditForm(manager, category);
        return;   
    }

    let closeCategoryEditForm = e.target.closest("#editCategoryCloseForm"); 
    if (closeCategoryEditForm) {
        domManager.categoryDomManager.closeCategoryEditForm();
        domManager.toggleButtons();
        return;   
    }

    let deleteCategoryEditForm = e.target.closest("#editCategoryDelete"); 
    if (deleteCategoryEditForm) {
        const categoryToDelete = domManager.categoryDomManager.getCategoryBeingEdited();
        if (manager.categoryManager.canDelete(categoryToDelete, manager.todoManager.todos)) {
            domManager.categoryDomManager.deleteCategoryEditForm();
            manager.categoryManager.deleteCategory(categoryToDelete);
        } else {
            alert("Cannot Delete Category w/ Existing Todo's")
        }
        domManager.toggleButtons();
        return;   
    }

    let colorSquareSelected = e.target.closest(".colorSquare");
    if (colorSquareSelected) {
        domManager.categoryDomManager.colorSelectedEditForm(colorSquareSelected);
        return;
    }

    let symbolSquareSelected = e.target.closest(".symbolPickerIcon");
    if (symbolSquareSelected) {
        domManager.categoryDomManager.symbolSelectedEditForm(symbolSquareSelected);
        return;
    }

    let submitCategoryEditForm = e.target.closest("#editCategoryConfirmForm"); 
    if (submitCategoryEditForm) {
        const categoryBeingEdited = domManager.categoryDomManager.getCategoryBeingEdited();
        const editedCategoryFields = domManager.categoryDomManager.submitCategoryEditForm();
        manager.categoryManager.updateCategory(categoryBeingEdited, editedCategoryFields);
        domManager.todoDomManager.updateTodosAfterCategoryEdit(
            manager.todoManager.getTodosByCategoryID(categoryBeingEdited.categoryID));
        domManager.toggleButtons();
        return;   
    }
    /////////////////////////////////////////////////////////

    // Sort Button
    /////////////////////////////////////////////////////////
    if (!domManager.getButtonToggleState() && !e.target.closest("#sortButton-content p, #sortButton")) {
        document.getElementById("sortButton-content").style.display = "none";
        domManager.toggleButtons(); // THIS ONE AND THE FILTER ONE NEED TO BE ABOVE THE INITIAL CLICKS
    }

    let sortSelection = e.target.closest("#sortButton-content p");
    if (sortSelection) {
        domManager.todoDomManager.sortTodos(manager, sortSelection);
        document.getElementById("sortButton-content").style.display = "none";
        domManager.toggleButtons();
        return;
    }
    /////////////////////////////////////////////////////////

    // Filter Button
    /////////////////////////////////////////////////////////
    if (!domManager.getButtonToggleState() && !e.target.closest("#filterButton-content p, #filterButton")) {
        document.getElementById("filterButton-content").style.display = "none";
        domManager.toggleButtons(true);
    }
    /////////////////////////////////////////////////////////

    // Help
    /////////////////////////////////////////////////////////
    let closeHelp = e.target.closest("#helpOverlayCloseButton");
    if (closeHelp) {
        domManager.toolbarDomManager.closeHelp();
        domManager.toggleButtons();
        return;
    }
    /////////////////////////////////////////////////////////
});

// Dynamic Forms (For forms that are not alwyas visible)
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("submit", (e) => {
    e.preventDefault();

    let submitNewCategoryForm = e.target.id == "newCategoryNameForm"
    if (submitNewCategoryForm) {
        const name = document.forms.newCategoryNameForm["newCategoryName"].value;
        const validForm = name.length > 2 && name.length < 12; 

        if (!validForm) {
            alert("Names must be between 2 and 12 characters");
        }
        else {
            e.target.parentElement.removeChild(e.target);
            domManager.categoryDomManager.addCategoryToDOM(manager.categoryManager.addCategory(name));
            addCategoryButton.style.display = "block";
        }
        domManager.toggleButtons();
    }
});

// Timed Fucntions
///////////////////////////////////////////////////////////////////////////////
setInterval(
    function() {
        domManager.todoDomManager.colorPastDue(manager.todoManager.todos) 
    }, 1000);

// Debug

///////////////////////////////////////////////////////////////////////////////
function doSomething() {
    //console.log(domManager.todoDomManager.getTodoBeingEdited())
    //console.log(manager.categoryManager.categories)
    //console.log(manager.todoManager.todos)
}

setInterval(doSomething, 5000); // Time in milliseconds
