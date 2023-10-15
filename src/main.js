import { DomManager } from "./domManager";
import { Manager } from './manager';
import "./style/styles.css";

// Initial setup
const manager = Manager();
const domManager = DomManager();
domManager.categoryDomManager.addCategoryToDOM(manager.categoryManager.addCategory("Default"));
domManager.todoDomManager.addTodoToDOM(manager, manager.todoManager.addTodo( {
    newTodoName: "Click Me!",
    newTodoDescription: "",
    newTodoDueDate: new Date(),
    newTodoCategory: manager.categoryManager.getCategoryByName("Default")}));

// Click events
/////////////////////////////////////////////////////////////////////////////
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.categoryDomManager.getNewCategory();
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.todoDomManager.openNewTodoForm(manager);
});

// Dynamic Click Events (for elements that are not always visible)
// theres probably a cleaner way to implement this
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
    
    // Edit Todo
    /////////////////////////////////////////////////////////
    let openEditTodoForm = e.target.closest(".todoEditButton");
    if(openEditTodoForm) {
        const todo = manager.todoManager.getTodoByID(openEditTodoForm.parentNode.parentNode.dataset.todoID);
        domManager.todoDomManager.openEditTodoForm(manager, todo);
        return;
    };

    let submitEditTodoForm = e.target.closest("#editTodoConfirmForm"); 
    if (submitEditTodoForm) {
        const editedTodoFields = domManager.submitEditTodoForm(manager);
        manager.todoDomManager.updateTodo(domManager.todoBeingEdited, editedTodoFields);
        return;   
    }

    let closeEditTodoForm = e.target.closest("#editTodoCloseForm"); 
    if (closeEditTodoForm) {
        domManager.todoDomManager.closeEditTodoForm();
        return;   
    }

    let deleteTodoEditTodoForm = e.target.closest("#editTodoDeleteTodo"); 
    if (deleteTodoEditTodoForm) {
        domManager.todoDomManager.deleteTodoEditTodoForm();
        manager.todoManager.deleteTodo(domManager.todoBeingEdited);
        return;   
    }
    /////////////////////////////////////////////////////////

    // Full Todo
    /////////////////////////////////////////////////////////
    let showFullTodo = e.target.closest(".todoNote");
    if(showFullTodo) {
        const todo = manager.todoManager.getTodoByID(showFullTodo.dataset.todoID);
        domManager.todoDomManager.showFullTodo(manager, todo);
        return;
    };

    let closeFullTodo = e.target.closest("#todoFullOverlayCloseButton");
    if(closeFullTodo) {
        domManager.todoDomManager.closeFullTodo();
        return;
    };
    /////////////////////////////////////////////////////////

    // New Todo
    /////////////////////////////////////////////////////////
    let closeNewTodoForm = e.target.closest("#newTodoCloseForm");
    if (closeNewTodoForm) {
        domManager.todoDomManager.closeNewTodoForm();
        return;
    }

    let submitNewTodoForm = e.target.closest("#newTodoConfirmForm");
    if (submitNewTodoForm) {
        const newTodoFields = domManager.submitNewTodoForm(manager);
        
        const newTodo = manager.todoManager.addTodo(newTodoFields);
        domManager.todoDomManager.addTodoToDOM(newTodo);
        return;
    };
    /////////////////////////////////////////////////////////


    // Edit Category
    /////////////////////////////////////////////////////////
    let openEditCategoryForm = e.target.closest(".editCategoryButton"); 
    if (openEditCategoryForm) {
        const categoryID = openEditCategoryForm.parentNode.parentNode.dataset.categoryID;
        const category = manager.categoryManager.getCategoryByID(categoryID);
        domManager.categoryDomManager.openCategoryEditForm(manager, category);
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
        domManager.categoryDomManager.deleteCategoryEditForm();
        manager.categoryManager.deleteCategory(category);
        return;   
    }

    let submitCategoryEditForm = e.target.closest("#editCategoryConfirmForm"); 
    if (submitCategoryEditForm) {
        const editedCategoryFields = domManager.categoryDomManager.submitCategoryEditForm();
        manager.categoryManager.updateCategory(domManager.categoryBeingEdited, editedCategoryFields);
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
            domManager.categoryDomManager.addCategoryToDOM(manager.addCategory(name));
            addCategoryButton.style.display = "block";
        }
    }
});

// Debug
///////////////////////////////////////////////////////////////////////////////
function doSomething() {
    console.log(domManager.todoDomManager.todoBeingEdited)
    console.log(domManager.categoryDomManager.categoryBeingEdited)
    console.log(manager.categoryManager.categories)
    console.log(manager.todoManager.todos)
}

setInterval(doSomething, 5000); // Time in milliseconds