import { DomManager } from "./index";
import { Manager, Todo, Category } from './todo_manager';
import "./style/styles.css";

const manager = Manager();
const domManager = DomManager();
domManager.addCategoryToDOM(manager.addCategory("Default"));
domManager.addTodoToDOM(manager.addTodo("Click Me!","","",manager.getCategoryByName("Default"),false));

const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    domManager.getNewUserCategory(manager);
});

var intervalId = setInterval(function() {
    console.log(manager.todos);
  }, 5000);