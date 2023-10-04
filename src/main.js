import { DomManager } from "./index";
import { Manager } from './todo_manager';
import "./style/styles.css";

const manager = Manager();
const domManager = DomManager();
domManager.addCategoryToDOM(manager.addCategory("Default"));
domManager.addTodoToDOM(manager.addTodo("Click Me!","",new Date(),manager.getCategoryByName("Default")));

const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.getNewCategory(manager);
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
    domManager.getNewTodo(manager);
});

document.addEventListener("click", (e) => {
    let target; 

    target = e.target.closest(".todoEditButton");
    if(target) {
        domManager.getTodoEdits(manager, target.parentNode.parentNode)
        return;
    };

    target = e.target.closest(".todoNote");
    if(target) {
        domManager.showFullTodo(manager, target);
        return;
    };

    target = e.target.closest("#todoFullOverlayCloseButton");
    if(target) {
        domManager.closeFullTodo();
        return;
    };
});
