import Pushpin from "../src/imgs/icons8-push-pin-50.png";
import CheckMark from "../src/imgs/icons8-check-mark-50.png";
import TodoEditButton from "../src/imgs/icons8-edit-50.png";

const TodoDomManager = () => {
    let todoBeingEdited = null;
    let todoOrderAdded = [];

    // Export Functions
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

        const alreadyAdded = todoOrderAdded.find( (alreadyAddedTodo) => {
            return alreadyAddedTodo.todoID == todo.todoID;
        });

        if (!alreadyAdded) {
            todoOrderAdded.push(todo);
        }
    };

    const showFullTodo = (manager, todo) => {
        document.querySelector("#todoFullOverlay").style.display = "flex";
        document.querySelector("#todoFullOverlay").style.background = todo.category.color;
        document.querySelector("#todoFullName").textContent = todo.name;
        document.querySelector("#todoFullDate").textContent = manager.GetFormattedDate(todo.dueDate);
        if (todo.dueDate <= new Date()) {
            document.querySelector("#todoFullDate").style.color = 'red';
        }
        else {
            document.querySelector("#todoFullDate").style.color = 'black';
        }
        document.querySelector("#todoFullDescription").textContent = todo.desc;
        document.querySelector("#todoFullCategory").textContent = todo.category.name;
        document.querySelector("#todoFullCategoryImg").src = todo.category.symbol;
    };

    const closeFullTodo = () => {
        document.querySelector("#todoFullOverlay").style.display = "none";
    };

    const getTodoBeingEdited = () => {
        return todoBeingEdited;
    }

    const openEditTodoForm = (manager, todo) => {
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

    const submitEditTodoForm = (manager) => {
        const newTodoName = document.forms.editTodoOverlay["editTodoTitle"].value;
        const newTodoDescription = document.forms.editTodoOverlay["editTodoDescription"].value;
        const newTodoDueDate = new Date(document.forms.editTodoOverlay["editTodoDueDate"].value);
        const newTodoCategory = manager.categoryManager.getCategoryByID(document.forms.editTodoOverlay["editTodoCategory"].value);

        if(validTodoInput(newTodoName, newTodoDueDate, true)) {
            const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
            todoDOM.querySelector(".todoTitleContent").textContent = newTodoName;
            todoDOM.querySelector(".todoDateContent").textContent = manager.GetFormattedDate(newTodoDueDate);
            todoDOM.querySelector(".todoCategory").src = newTodoCategory.symbol;
            todoDOM.style.background = newTodoCategory.color;
            closeEditTodoForm();

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

    const deleteTodoViaEditForm = () => {
        closeEditTodoForm();
        const todoDOM = document.querySelector(`[data-todo-i-d='${todoBeingEdited.todoID}']`);
        todoDOM.parentNode.removeChild(todoDOM);
    };

    const updateTodosAfterCategoryEdit = (todos) => {
        todos.forEach( (todo) => {
            const todoDOM = document.querySelector(`[data-todo-i-d='${todo.todoID}']`);
            todoDOM.querySelector(".todoCategory").src = todo.category.symbol;
            todoDOM.style.background = todo.category.color;
        });
    };

    const colorPastDue = (todos) => {
        todos.forEach( (todo) => {
            let dueDate = todo.dueDate;
            if (typeof dueDate === 'string' || dueDate instanceof String) {
                dueDate = Date.parse(dueDate);
            }

            const todoDOM = document.querySelector(`[data-todo-i-d='${todo.todoID}']`);
            if (dueDate <= new Date()) {
                todoDOM.querySelector(".todoDateContent").style.color = 'red';
            }
            else {
                todoDOM.querySelector(".todoDateContent").style.color = 'black';
            }
        });
    };

    const setTodoComplete = (todo) => {
        const todoDOM = document.querySelector(`[data-todo-i-d='${todo.todoID}']`);
        todoDOM.style.display = "none";
    };

    const sortTodos = (manager, sortSelection) => {
        const todoNotes = document.querySelectorAll(".todoNote");
        todoNotes.forEach( (todoNote) => {
            todoNote.parentElement.removeChild(todoNote);
        });

        switch (sortSelection.textContent) {
            case "Due Date":
                let todoDateOrder = todoOrderAdded.slice();
                todoDateOrder.sort( (a,b) => {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                todoDateOrder.forEach( (todo) => {
                    addTodoToDOM(manager, todo);
                });
                break;
            case "Todo Name":
                break;
            default:
                todoOrderAdded.forEach( (todo) => {
                    addTodoToDOM(manager, todo);
                });
            }
    }

    // Support Functions
    const validTodoInput = (newTodoName, newTodoDueDate, isEdit = false) => {
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
        addTodoToDOM,
        showFullTodo,
        closeFullTodo,
        getTodoBeingEdited,
        openEditTodoForm,
        submitEditTodoForm,
        closeEditTodoForm,
        deleteTodoViaEditForm,
        updateTodosAfterCategoryEdit,
        colorPastDue,
        setTodoComplete,
        sortTodos
    }
};

export { TodoDomManager };