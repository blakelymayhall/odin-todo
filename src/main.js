import { initPageLoad, addNewCategoryToDOM } from "./index";
import { Todo, Category } from './todo_manager';
import "./style/styles.css";

// Load image assets 
initPageLoad();

function updateCategories() {
    categories = [];
    const categoryRows = document.querySelectorAll("[data-category]");
    categoryRows.forEach((row) => {
        categories.push(row.dataset.category);
    });
}

let categories = [];
let todos = [];

// Buttons that toggle the player config form
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
    addNewCategoryToDOM(addCategoryButton);
});

