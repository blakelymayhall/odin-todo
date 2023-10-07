import { DomManager } from "./index";
import { Manager } from './todo_manager';
import "./style/styles.css";

// Initial setup
const manager = Manager();
const domManager = DomManager();
domManager.addCategoryToDOM(manager.addCategory("Default"));
domManager.addTodoToDOM(manager.addTodo("Click Me!","",new Date(),manager.getCategoryByName("Default")));

// Click events
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.getNewCategory(manager);
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.openNewTodoForm(manager);
});

// Dynamic Click Events (for elements that are not always visable)
document.addEventListener("click", (e) => {
    
    let openEditTodoForm = e.target.closest(".todoEditButton");
    if(openEditTodoForm) {
        domManager.openEditTodoForm(manager, openEditTodoForm.parentNode.parentNode)
        return;
    };

    let showFullTodo = e.target.closest(".todoNote");
    if(showFullTodo) {
        domManager.showFullTodo(manager, showFullTodo);
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
        domManager.submitNewTodoForm(manager);
        return;
    };

    let submitEditTodoForm = e.target.closest("#editTodoConfirmForm"); 
    if (submitEditTodoForm) {
        domManager.submitEditTodoForm(manager);
        return;   
    }

    let closeEditTodoForm = e.target.closest("#editTodoCloseForm"); 
    if (closeEditTodoForm) {
        domManager.closeEditTodoForm();
        return;   
    }
});
