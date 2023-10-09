import { DomManager } from "./index";
import { Manager } from './todo_manager';
import "./style/styles.css";

// Initial setup
const manager = Manager();
const domManager = DomManager();
domManager.addCategoryToDOM(manager.addCategory("Default"));
domManager.addTodoToDOM(manager.addTodo( {
    newTodoName: "Click Me!",
    newTodoDescription: "",
    newTodoDueDate: new Date(),
    newTodoCategory: manager.getCategoryByName("Default")}));

// Click events
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    const newCategoryName = domManager.getNewCategory();
    console.log(newCategoryName)
    <//this needs to be mvoed to a dynamic event listener // >
    if (newCategoryName != null) {
        console.log(newCategoryName)
        domManager.addCategoryToDOM(manager.addCategory(newCategoryName));
    };
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.openNewTodoForm(manager);
});

// Dynamic Click Events (for elements that are not always visable)
// theres probably a cleaner way to implement this
// also, it would be nice if the manage functions weren't called from inside the dom functions
document.addEventListener("click", (e) => {
    
    let openEditTodoForm = e.target.closest(".todoEditButton");
    if(openEditTodoForm) {
        const todo = manager.getTodoByID(openEditTodoForm.parentNode.parentNode.dataset.todoID);
        domManager.openEditTodoForm(manager, todo);
        return;
    };

    let showFullTodo = e.target.closest(".todoNote");
    if(showFullTodo) {
        const todo = manager.getTodoByID(showFullTodo.dataset.todoID);
        domManager.showFullTodo(todo);
        return;
    };

    let closeFullTodo = e.target.closest("#todoFullOverlayCloseButton");
    if(closeFullTodo) {
        domManager.closeFullTodo();
        return;
    };

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
});

function doSomething() {
    console.log(domManager.todoBeingEdited)
    console.log(manager.categories)
    console.log(manager.todos)
}

setInterval(doSomething, 5000); // Time in milliseconds