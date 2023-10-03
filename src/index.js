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

// Export Functions
const DomManager = () => {
    
    loadImageAssets();

    const addCategoryToDOM = (category) => {
        const categoryRow = document.createElement("li");
        categoryRow.classList.add("categoryRow");
        categoryRow.dataset.categoryID = category.categoryID;
        const categoryName = document.createElement("p");
        categoryName.textContent = category.name;
        const categroyRowImages = document.createElement("div");
        categroyRowImages.classList.add("categroyRowImages");
        const categoryRowCategoryIcon = document.createElement("img");
        categoryRowCategoryIcon.src = category.symbol;
        categoryRowCategoryIcon.classList.add("categoryRowCategoryIcon");
        const editCategoryButton = document.createElement("img");
        editCategoryButton.src = EditCategoryButton;
        editCategoryButton.classList.add("editCategoryButton");
        categroyRowImages.appendChild(categoryRowCategoryIcon);
        categroyRowImages.appendChild(editCategoryButton);
        categoryRow.appendChild(categoryName);
        categoryRow.appendChild(categroyRowImages);
        const seperator = document.createElement("li");
        seperator.classList.add("seperator");
        const addCategoryButton = document.querySelector("#addCategoryButton");
        document.querySelector("#categoryList").insertBefore(categoryRow,addCategoryButton);
        document.querySelector("#categoryList").insertBefore(seperator,addCategoryButton);
    };

    const addTodoToDOM = (todo) => {
        const todoNote = document.createElement("div");
        todoNote.classList.add("todoNote");
        todoNote.style.background=todo.category.color;
        todoNote.dataset.todoID = todo.todoID;
        const pushpin = document.createElement("img");
        pushpin.src = Pushpin;
        pushpin.classList.add("pushpin");
        const todoContent = document.createElement("div");
        todoContent.classList.add("todoContent");
        const todoTitleRow = document.createElement("div");
        todoTitleRow.classList.add("todoTitleRow");
        const todoTitle = document.createElement("p");
        todoTitle.classList.add("todoTitle");
        todoTitle.textContent = "Todo:";
        const todoTitleContent = document.createElement("p");
        todoTitleContent.classList.add("todoTitleContent");
        todoTitleContent.textContent = todo.name;
        const todoEditButton = document.createElement("img");
        todoEditButton.classList.add("todoEditButton");
        todoEditButton.src = TodoEditButton;
        const todoDateRow = document.createElement("div");
        todoDateRow.classList.add("todoDateRow");
        const todoDateTitle = document.createElement("p");
        todoDateTitle.classList.add("todoDateTitle");
        todoDateTitle.textContent = "Due Date:";
        const todoDateContent = document.createElement("p");
        todoDateContent.classList.add("todoDateContent");
        todoDateContent.textContent = todo.GetFormattedDate();
        const todoCategory = document.createElement("img");
        todoCategory.classList.add("todoCategory");
        todoCategory.src = todo.category.symbol;

        todoNote.appendChild(pushpin);
        todoTitleRow.appendChild(todoTitle);
        todoTitleRow.appendChild(todoTitleContent);
        todoContent.appendChild(todoTitleRow);
        todoContent.appendChild(todoEditButton);
        todoDateRow.appendChild(todoDateTitle);
        todoDateRow.appendChild(todoDateContent);
        todoContent.appendChild(todoDateRow);
        todoContent.appendChild(todoCategory);
        todoNote.appendChild(todoContent);

        document.querySelector("#board").appendChild(todoNote);
    };

    const getNewCategory = (manager) =>  {
        const addCategoryButton = document.querySelector("#addCategoryButton");
        addCategoryButton.style.display = "none";
        const newCategoryNameForm = document.createElement("form");
        newCategoryNameForm.setAttribute("id", "newCategoryNameForm");
        const newCategoryName = document.createElement("input");
        newCategoryName.setAttribute("id", "newCategoryName");
        newCategoryName.autofocus=true;
        newCategoryName.type="text";
        newCategoryName.minlength="2";
        newCategoryName.maxlength="20";
        newCategoryNameForm.appendChild(newCategoryName);
        newCategoryNameForm.addEventListener("submit", (formSubmit) => {
            formSubmit.preventDefault();
            if(validCategoryInput()) {
                const name = document.forms.newCategoryNameForm["newCategoryName"].value;
                addCategoryToDOM(manager.addCategory(name));
                newCategoryNameForm.parentElement.removeChild(newCategoryNameForm);
                addCategoryButton.style.display = "block";
            }
        });
        document.querySelector("#categoryList").insertBefore(newCategoryNameForm,addCategoryButton);
    }

    const getNewTodo = (manager) => {
        document.querySelector("#newTodoOverlay").style.display = "flex";

        // Disable buttons (make a function for this)
        document.querySelector("#addCategoryButton").style.pointerEvents = "none";

        manager.categories.forEach( (category) => {
            const categoryOption = document.createElement("option");
            categoryOption.value=category.categoryID;
            categoryOption.text=category.name;
            document.querySelector("#newTodoCategory").appendChild(categoryOption);
        });

        const closeButton = document.querySelector("#newTodoCloseForm");
        closeButton.addEventListener("click", () => {
            document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
            document.querySelector("#newTodoOverlay").style.display = "none";
            document.forms.newTodoOverlay.reset();
            const toDelete = document.querySelectorAll("#newTodoCategory option")
            toDelete.forEach((e) => {
                e.parentElement.removeChild(e);
            });
        });

        const submitButton = document.querySelector("#newTodoConfirmForm");
        submitButton.addEventListener("click", () => {
            if(validTodoInput()) {
                const newTodoName = document.forms.newTodoOverlay["newTodoTitle"].value;
                const newTodoDescription = document.forms.newTodoOverlay["newTodoDescription"].value;
                const newTodoDueDate = new Date(document.forms.newTodoOverlay["newTodoDueDate"].value);
                const newTodoCategory = manager.getCategoryByID(document.forms.newTodoOverlay["newTodoCategory"].value);
                addTodoToDOM(manager.addTodo(newTodoName,newTodoDescription,newTodoDueDate,newTodoCategory));

                document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
                document.querySelector("#newTodoOverlay").style.display = "none";
                document.forms.newTodoOverlay.reset();
                const toDelete = document.querySelectorAll("#newTodoCategory option")
                toDelete.forEach((e) => {
                    e.parentElement.removeChild(e);
                });
            }
        });
    };

    const showFullTodo = (manager, todoDOM) => {
        const todo = manager.getTodoByID(todoDOM.dataset.todoID);
        document.querySelector("#todoFullOverlay").style.display = "flex";
        document.querySelector("#todoFullOverlay").style.background = todo.category.color;
        document.querySelector("#todoFullName").textContent = todo.name;
        document.querySelector("#todoFullDate").textContent = todo.GetFormattedDate();
        document.querySelector("#todoFullDescription").textContent = todo.desc;
        document.querySelector("#todoFullCategory").textContent = todo.category.name;
        document.querySelector("#todoFullCategoryImg").src = todo.category.symbol;
    };

    return {
        addCategoryToDOM,
        addTodoToDOM,
        getNewCategory,
        getNewTodo,
        showFullTodo
    }
};


// Support Functions
function loadImageAssets() {
    document.querySelector("#addCategoryButton").src = AddCategoryButton;
    document.querySelector("#addToDoButton").src = AddToDoButton;
    document.querySelector("#filterButton").src = FilterButton;
    document.querySelector("#sortButton").src = SortButton;
    document.querySelector("#searchIcon").src = SearchIcon;
    document.querySelector("#helpButton").src = HelpButton;
    document.querySelector("#settingsButton").src = SettingsButton;
};

function validCategoryInput() {
    const newCategoryName = document.forms.newCategoryNameForm["newCategoryName"].value;
    const invalidForm = newCategoryName.length > 2 && newCategoryName.length < 12; 
    if (!invalidForm) {
      alert("Names must be between 2 and 12 characters");
    }
    return invalidForm;
};

function validTodoInput() {
    // the second time the form is submitted the fields arent right
    const newTodoName = document.forms.newTodoOverlay["newTodoTitle"].value;
    const validName = newTodoName.length > 2 && newTodoName.length < 12; 
    if (!validName) {
        console.log(newTodoName);
      alert("Names must be between 2 and 12 characters");
      return false;
    }

    const newTodoDueDate = document.forms.newTodoOverlay["newTodoDueDate"].value;
    const validDate = newTodoDueDate != "" && newTodoDueDate != null && 
        new Date(newTodoDueDate) > new Date(); // Check against current date
    if (!validDate) {
      alert("Date must be future date");
      return false;
    }

    return true;
};

export { 
    DomManager
};