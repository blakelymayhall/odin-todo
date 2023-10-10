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
import CheckMark from "../src/imgs/icons8-check-mark-50.png";

// Export Functions
const DomManager = () => {
    
    let todoBeingEdited = null;

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
        const todoCheckButton = document.createElement("img");
        todoCheckButton.classList.add("todoCheckButton");
        todoCheckButton.src = CheckMark;
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
        todoContent.appendChild(todoCheckButton);
        todoContent.appendChild(todoEditButton);
        todoDateRow.appendChild(todoDateTitle);
        todoDateRow.appendChild(todoDateContent);
        todoContent.appendChild(todoDateRow);
        todoContent.appendChild(todoCategory);
        todoNote.appendChild(todoContent);

        document.querySelector("#board").appendChild(todoNote);
    };

    const getNewCategory = () =>  {
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
        document.querySelector("#categoryList").insertBefore(newCategoryNameForm,addCategoryButton);
    }

    const openNewTodoForm = (manager) => {
        document.querySelector("#newTodoOverlay").style.display = "flex";

        // Disable buttons (make a function for this)
        //
        document.querySelector("#addCategoryButton").style.pointerEvents = "none";
        //

        manager.categories.forEach( (category) => {
            const categoryOption = document.createElement("option");
            categoryOption.value=category.categoryID;
            categoryOption.text=category.name;
            document.querySelector("#newTodoCategory").appendChild(categoryOption);
        });
    };

    const submitNewTodoForm = (manager) => {
        const newTodoName = document.forms.newTodoOverlay["newTodoTitle"].value;
        const newTodoDescription = document.forms.newTodoOverlay["newTodoDescription"].value;
        const newTodoDueDate = new Date(document.forms.newTodoOverlay["newTodoDueDate"].value);
        const newTodoCategory = manager.getCategoryByID(document.forms.newTodoOverlay["newTodoCategory"].value);

        if(validTodoInput(newTodoName, newTodoDueDate)) {
            document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
            document.querySelector("#newTodoOverlay").style.display = "none";
            document.forms.newTodoOverlay.reset();
            const toDelete = document.querySelectorAll("#newTodoCategory option")
            toDelete.forEach((e) => {
                e.parentElement.removeChild(e);
            });
            
            return {
                newTodoName, 
                newTodoDescription, 
                newTodoDueDate, 
                newTodoCategory
            };
        }

        return null;
    }

    const closeNewTodoForm = () => {
        document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
        document.querySelector("#newTodoOverlay").style.display = "none";
        document.forms.newTodoOverlay.reset();
        const toDelete = document.querySelectorAll("#newTodoCategory option")
        toDelete.forEach((e) => {
            e.parentElement.removeChild(e);
        });
    };

    const showFullTodo = (todo) => {
        document.querySelector("#todoFullOverlay").style.display = "flex";
        document.querySelector("#todoFullOverlay").style.background = todo.category.color;
        document.querySelector("#todoFullName").textContent = todo.name;
        document.querySelector("#todoFullDate").textContent = todo.GetFormattedDate();
        document.querySelector("#todoFullDescription").textContent = todo.desc;
        document.querySelector("#todoFullCategory").textContent = todo.category.name;
        document.querySelector("#todoFullCategoryImg").src = todo.category.symbol;
    };

    const closeFullTodo = () => {
        document.querySelector("#todoFullOverlay").style.display = "none";
    };

    function openEditTodoForm(manager, todo) {
        this.todoBeingEdited = todo;
        todoBeingEdited = this.todoBeingEdited;

        document.querySelector("#editTodoOverlay").style.display = "flex";
        document.querySelector("#editTodoTitle").value = todoBeingEdited.name;
        document.querySelector("#editTodoDescription").value = todoBeingEdited.desc;
        todoBeingEdited.dueDate.setMinutes(todoBeingEdited.dueDate.getMinutes() - todoBeingEdited.dueDate.getTimezoneOffset());
        document.querySelector("#editTodoDueDate").value = todoBeingEdited.dueDate.toISOString().slice(0,16);
        manager.categories.forEach( (category) => {
            const categoryOption = document.createElement("option");
            categoryOption.value=category.categoryID;
            categoryOption.text=category.name;
            if (category == todoBeingEdited.category) {
                categoryOption.selected = "selected";
            }
            document.querySelector("#editTodoCategory").appendChild(categoryOption);
        });
    }

    const submitEditTodoForm = (manager) => {
        const newTodoName = document.forms.editTodoOverlay["editTodoTitle"].value;
        const newTodoDescription = document.forms.editTodoOverlay["editTodoDescription"].value;
        const newTodoDueDate = new Date(document.forms.editTodoOverlay["editTodoDueDate"].value);
        const newTodoCategory = manager.getCategoryByID(document.forms.editTodoOverlay["editTodoCategory"].value);

        if(validTodoInput(newTodoName, newTodoDueDate, true)) {
            const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
            todoDOM.querySelector(".todoTitleContent").textContent = todoBeingEdited.name;
            todoDOM.querySelector(".todoDateContent").textContent = todoBeingEdited.GetFormattedDate();
            document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
            document.querySelector("#editTodoOverlay").style.display = "none";
            document.forms.editTodoOverlay.reset();
            const toDelete = document.querySelectorAll("#editTodoCategory option")
            toDelete.forEach((e) => {
                e.parentElement.removeChild(e);
            });
            
            return {
                newTodoName, 
                newTodoDescription, 
                newTodoDueDate, 
                newTodoCategory
            };
        }

        return null;
    };

    const closeEditTodoForm = () => {
        document.querySelector("#editTodoOverlay").style.display = "none";
        document.forms.editTodoOverlay.reset();
        const toDelete = document.querySelectorAll("#editTodoOverlay option")
        toDelete.forEach((e) => {
            e.parentElement.removeChild(e);
        });
    };

    const deleteTodoEditTodoForm = () => {
        document.querySelector("#editTodoOverlay").style.display = "none";
        document.forms.editTodoOverlay.reset();
        const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
        todoDOM.parentNode.removeChild(todoDOM);
    }

    return {
        addCategoryToDOM,
        addTodoToDOM,
        getNewCategory,
        openNewTodoForm,
        submitNewTodoForm,
        closeNewTodoForm,
        showFullTodo,
        closeFullTodo,
        openEditTodoForm,
        submitEditTodoForm,
        closeEditTodoForm,
        deleteTodoEditTodoForm
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

function validTodoInput(newTodoName, newTodoDueDate, isEdit = false) {
    const validName = newTodoName.length > 2 && newTodoName.length < 12; 
    if (!validName) {
      alert("Names must be between 2 and 12 characters");
      return false;
    }

    const validDate = newTodoDueDate != "" && newTodoDueDate != null && 
        (new Date(newTodoDueDate) > new Date() || isEdit); // Check against current date
    if (!validDate) {
      alert("Date must be future date");
      return false;
    }

    return true;
};

export { 
    DomManager
};