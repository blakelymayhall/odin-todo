import Pushpin from "../src/imgs/icons8-push-pin-50.png";
import CheckMark from "../src/imgs/icons8-check-mark-50.png";
import TodoEditButton from "../src/imgs/icons8-edit-50.png";

const TodoDomManager = () => {
    let todoBeingEdited = null;

    const addTodoToDOM = (manager, todo) => {
        const todoNote = document.createElement("div");
        todoNote.classList.add("todoNote");
        todoNote.style.background = todo.category.color;
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
        todoDateContent.textContent = manager.GetFormattedDate(todo.dueDate);
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

    const showFullTodo = (manager, todo) => {
        document.querySelector("#todoFullOverlay").style.display = "flex";
        document.querySelector("#todoFullOverlay").style.background = todo.category.color;
        document.querySelector("#todoFullName").textContent = todo.name;
        document.querySelector("#todoFullDate").textContent = manager.GetFormattedDate(todo.dueDate);
        document.querySelector("#todoFullDescription").textContent = todo.desc;
        document.querySelector("#todoFullCategory").textContent = todo.category.name;
        document.querySelector("#todoFullCategoryImg").src = todo.category.symbol;
    };

    const closeFullTodo = () => {
        document.querySelector("#todoFullOverlay").style.display = "none";
    };

    const openNewTodoForm = (manager) => {
        document.querySelector("#newTodoOverlay").style.display = "flex";

        // Disable buttons (make a function for this)
        //
        document.querySelector("#addCategoryButton").style.pointerEvents = "none";
        //

        manager.categoryManager.categories.forEach( (category) => {
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
        const newTodoCategory = manager.categoryManager.getCategoryByID(document.forms.newTodoOverlay["newTodoCategory"].value);

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

    function openEditTodoForm(manager, todo) {
        todoBeingEdited = todo;

        document.querySelector("#editTodoOverlay").style.display = "flex";
        document.querySelector("#editTodoTitle").value = todoBeingEdited.name;
        document.querySelector("#editTodoDescription").value = todoBeingEdited.desc;
        todoBeingEdited.dueDate.setMinutes(todoBeingEdited.dueDate.getMinutes() - todoBeingEdited.dueDate.getTimezoneOffset());
        document.querySelector("#editTodoDueDate").value = todoBeingEdited.dueDate.toISOString().slice(0,16);
        manager.categoryManager.categories.forEach( (category) => {
            const categoryOption = document.createElement("option");
            categoryOption.value=category.categoryID;
            categoryOption.text=category.name;
            if (category == todoBeingEdited.category) {
                categoryOption.selected = "selected";
            }
            document.querySelector("#editTodoCategory").appendChild(categoryOption);
        });
    }

    function submitEditTodoForm(manager)  {
        const newTodoName = document.forms.editTodoOverlay["editTodoTitle"].value;
        const newTodoDescription = document.forms.editTodoOverlay["editTodoDescription"].value;
        const newTodoDueDate = new Date(document.forms.editTodoOverlay["editTodoDueDate"].value);
        const newTodoCategory = manager.categoryManager.getCategoryByID(document.forms.editTodoOverlay["editTodoCategory"].value);

        if(validTodoInput(newTodoName, newTodoDueDate, true)) {
            const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
            todoDOM.querySelector(".todoTitleContent").textContent = newTodoName;
            todoDOM.querySelector(".todoDateContent").textContent = manager.GetFormattedDate(newTodoDueDate);
            document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
            document.querySelector("#editTodoOverlay").style.display = "none";
            document.forms.editTodoOverlay.reset();
            const toDelete = document.querySelectorAll("#editTodoCategory option")
            toDelete.forEach((e) => {
                e.parentElement.removeChild(e);
            });
            
            return {
                todoBeingEdited: todoBeingEdited,
                editedTodoFields: { 
                    newTodoName, 
                    newTodoDescription, 
                    newTodoDueDate, 
                    newTodoCategory
                }
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

    const deleteTodoViaEditForm = () => {
        document.querySelector("#editTodoOverlay").style.display = "none";
        document.forms.editTodoOverlay.reset();
        const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
        todoDOM.parentNode.removeChild(todoDOM);
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

    return {
        todoBeingEdited,
        addTodoToDOM,
        showFullTodo,
        closeFullTodo,
        openNewTodoForm,
        submitNewTodoForm,
        closeNewTodoForm,
        openEditTodoForm,
        submitEditTodoForm,
        closeEditTodoForm,
        deleteTodoViaEditForm
    }
};

export { TodoDomManager };