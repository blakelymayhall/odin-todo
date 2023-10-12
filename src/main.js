import { DomManager } from "./index";
import { Manager } from './todo_manager';
import "./style/styles.css";

// Initial setup
const manager = Manager();
const domManager = DomManager();
domManager.addCategoryToDOM(manager.addCategory("Default"));
domManager.addTodoToDOM(manager, manager.addTodo( {
    newTodoName: "Click Me!",
    newTodoDescription: "",
    newTodoDueDate: new Date(),
    newTodoCategory: manager.getCategoryByName("Default")}));

// Click events
/////////////////////////////////////////////////////////////////////////////
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.getNewCategory();
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.openNewTodoForm(manager);
});

// Dynamic Click Events (for elements that are not always visible)
// theres probably a cleaner way to implement this
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
    
    // Edit Todo
    /////////////////////////////////////////////////////////
    let openEditTodoForm = e.target.closest(".todoEditButton");
    if(openEditTodoForm) {
        const todo = manager.getTodoByID(openEditTodoForm.parentNode.parentNode.dataset.todoID);
        domManager.openEditTodoForm(manager, todo);
        return;
    };

    let submitEditTodoForm = e.target.closest("#editTodoConfirmForm"); 
    if (submitEditTodoForm) {
        const editedTodoFields = domManager.submitEditTodoForm(manager);
        manager.updateTodo(domManager.todoBeingEdited, editedTodoFields);
        return;   
    }

    let closeEditTodoForm = e.target.closest("#editTodoCloseForm"); 
    if (closeEditTodoForm) {
        domManager.closeEditTodoForm();
        return;   
    }

    let deleteTodoEditTodoForm = e.target.closest("#editTodoDeleteTodo"); 
    if (deleteTodoEditTodoForm) {
        domManager.deleteTodoEditTodoForm();
        manager.deleteTodo(domManager.todoBeingEdited);
        return;   
    }
    /////////////////////////////////////////////////////////

    // Full Todo
    /////////////////////////////////////////////////////////
    let showFullTodo = e.target.closest(".todoNote");
    if(showFullTodo) {
        const todo = manager.getTodoByID(showFullTodo.dataset.todoID);
        domManager.showFullTodo(manager, todo);
        return;
    };

    let closeFullTodo = e.target.closest("#todoFullOverlayCloseButton");
    if(closeFullTodo) {
        domManager.closeFullTodo();
        return;
    };
    /////////////////////////////////////////////////////////

    // New Todo
    /////////////////////////////////////////////////////////
    let closeNewTodoForm = e.target.closest("#newTodoCloseForm");
    if (closeNewTodoForm) {
        domManager.closeNewTodoForm();
        return;
    }

    let submitNewTodoForm = e.target.closest("#newTodoConfirmForm");
    if (submitNewTodoForm) {
        const newTodoFields = domManager.submitNewTodoForm(manager);
        
        const newTodo = manager.addTodo(newTodoFields);
        domManager.addTodoToDOM(newTodo);
        return;
    };
    /////////////////////////////////////////////////////////


    // Edit Category
    /////////////////////////////////////////////////////////
    let openEditCategoryForm = e.target.closest(".editCategoryButton"); 
    if (openEditCategoryForm) {
        const categoryID = openEditCategoryForm.parentNode.parentNode.dataset.categoryID;
        const category = manager.getCategoryByID(categoryID);
        domManager.openCategoryEditForm(manager, category);
        return;   
    }

    let closeCategoryEditForm = e.target.closest("#editCategoryCloseForm"); 
    if (closeCategoryEditForm) {
        document.querySelector("#editCategoryOverlay").style.display = "none";
        document.forms.editCategoryOverlay.reset();
        return;   
    }

    let deleteCategoryEditForm = e.target.closest("#editCategoryDelete"); 
    if (deleteCategoryEditForm) {
        domManager.deleteCategoryEditForm();
        manager.deleteCategory(category);
        return;   
    }

    let submitCategoryEditForm = e.target.closest("#editCategoryConfirmForm"); 
    if (submitCategoryEditForm) {
        const editedCategoryFields = domManager.submitCategoryEditForm();
        manager.updateCategory(domManager.categoryBeingEdited, editedCategoryFields);
        return;   
    }

    // Move these to dom manager
    /////////////////////////////////////////////////////////
});

// Dynamic Forms (For forms that are not alwyas visible)
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("submit", (e) => {
    e.preventDefault();

    let submitNewCategoryForm = e.target.id == "newCategoryNameForm"
    if(submitNewCategoryForm) {
        const name = document.forms.newCategoryNameForm["newCategoryName"].value;
        const validForm = name.length > 2 && name.length < 12; 

        if (!validForm) {
            alert("Names must be between 2 and 12 characters");
        }
        else {
            e.target.parentElement.removeChild(e.target);
            domManager.addCategoryToDOM(manager.addCategory(name));
            addCategoryButton.style.display = "block";
        }
    }
});

// Debug
///////////////////////////////////////////////////////////////////////////////
function doSomething() {
    console.log(domManager.todoBeingEdited)
    console.log(domManager.categoryBeingEdited)
    console.log(manager.categories)
    console.log(manager.todos)
}

setInterval(doSomething, 5000); // Time in milliseconds