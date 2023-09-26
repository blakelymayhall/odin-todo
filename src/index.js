import EditCategoryButton from "../src/imgs/icons8-settings-30.png";
import AddCategoryButton from "../src/imgs/icons8-plus-30.png";
import AddToDoButton from "../src/imgs/icons8-plus-50.png";
import FilterButton from "../src/imgs/icons8-filter-50.png";
import SortButton from "../src/imgs/icons8-sort-32.png";
import SearchIcon from "../src/imgs/icons8-magnifying-glass-50.png";
import HelpButton from "../src/imgs/icons8-help-50.png";
import SettingsButton from "../src/imgs/icons8-settings-96.png";
import Pushpin from "../src/imgs/icons8-push-pin-50.png";
import TodoEditButton from "../src/imgs/icons8-edit-50.png";
import TodoCategory from "../src/imgs/icons8-ghost-50.png"

import { Category } from "./todo_manager";

function loadImageAssets() {
    document.querySelector(".editCategoryButton").src = EditCategoryButton;
    document.querySelector("#addCategoryButton").src = AddCategoryButton;
    document.querySelector("#addToDoButton").src = AddToDoButton;
    document.querySelector("#filterButton").src = FilterButton;
    document.querySelector("#sortButton").src = SortButton;
    document.querySelector("#searchIcon").src = SearchIcon;
    document.querySelector("#helpButton").src = HelpButton;
    document.querySelector("#settingsButton").src = SettingsButton;
    document.querySelector(".pushpin").src = Pushpin;
    document.querySelector(".todoEditButton").src = TodoEditButton;
    document.querySelector(".todoCategory").src = TodoCategory;

};

const initPageLoad = () => {
    loadImageAssets();
    // presumembly this will do more
    // maybe change this export type to export 
    // multiple functions at that point?
}

function validCategoryInput() {
    const newCategoryName = document.forms.newCategoryNameForm["newCategoryName"].value;
    const invalidForm = newCategoryName.length > 2 && newCategoryName.length < 12; 
    if (!invalidForm) {
      alert("Names must be between 2 and 12 characters");
    }
    return invalidForm;
}

function addNewCategoryToDOM(addCategoryButton) {
    // turn off add button
    addCategoryButton.style.display = "none";

    // prompt user for category name, then append the new category if vaild name
    // and turn back on the add button
    const newCategoryNameForm = document.createElement("form");
    newCategoryNameForm.setAttribute("id", "newCategoryNameForm");
    const newCategoryName = document.createElement("input");
    newCategoryName.setAttribute("id", "newCategoryName");
    newCategoryName.type="text";
    newCategoryName.minlength="2";
    newCategoryName.maxlength="20";
    newCategoryNameForm.appendChild(newCategoryName);
    newCategoryNameForm.addEventListener("submit", (formSubmit) => {
        formSubmit.preventDefault();
        if(validCategoryInput()) {
            const name = document.forms.newCategoryNameForm["newCategoryName"].value;
            const category = document.querySelector(".categoryRow").cloneNode(true);
            category.dataset.category=Category(name);
            category.children[0].textContent = name;
            const seperator = document.querySelector(".seperator").cloneNode(true);
            document.querySelector("#categoryList").insertBefore(category,addCategoryButton);
            document.querySelector("#categoryList").insertBefore(seperator,addCategoryButton);
            newCategoryNameForm.parentElement.removeChild(newCategoryNameForm);
            addCategoryButton.style.display = "block";
        }
    });
    document.querySelector("#categoryList").insertBefore(newCategoryNameForm,addCategoryButton);
}

export { 
    initPageLoad,
    addNewCategoryToDOM
};