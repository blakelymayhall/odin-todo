import { DomManager } from "./domManager";
import { Manager } from "./manager";
import "./style/styles.css";


const mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  // Take the user to a different screen here.

if (!mobileTest) {
  document.getElementById("mainContainer").style.display = "grid";
  document.getElementById("mobileProtector").style.display = "none";
} else {
  const override = document.querySelector("#mobileProtectorOveride");
  override.addEventListener("click", () => {
    document.getElementById("mainContainer").style.display = "grid";
    document.getElementById("mobileProtector").style.display = "none";
  });
}

// Initial setup
/////////////////////////////////////////////////////////////////////////////
const manager = Manager();
const domManager = DomManager();

if (manager.loadState()) {
  console.log("Loading Data");
  manager.categoryManager.categories.forEach((category) => {
    domManager.categoryDomManager.addCategoryToDOM(category);
  });
  manager.todoManager.todos.forEach((todo) => {
    if (todo.status != 1) {
      domManager.todoDomManager.addTodoToDOM(manager, todo);
    }
  });
} else {
  console.log("Loading Default");
  domManager.categoryDomManager.addCategoryToDOM(
    manager.categoryManager.addCategory("Default")
  );

  domManager.todoDomManager.addTodoToDOM(
    manager,
    manager.todoManager.addTodo({
      newTodoName: "Click Me!",
      newTodoDescription: "",
      newTodoDueDate: new Date(),
      newTodoCategoryID:
        manager.categoryManager.getCategoryByName("Default").categoryID,
    })
  );
}

// Click events
/////////////////////////////////////////////////////////////////////////////
const addCategoryButton = document.querySelector("#addCategoryButton");
addCategoryButton.addEventListener("click", () => {
  if (manager.categoryManager.canAdd()) {
    domManager.toggleButtons();
    domManager.categoryDomManager.getNewCategory();
  }
});

const addTodoButton = document.querySelector("#addToDoButton");
addTodoButton.addEventListener("click", () => {
  domManager.toggleButtons();
  domManager.toolbarDomManager.openNewTodoForm(manager);
});

const sortButton = document.querySelector("#sortButton");
sortButton.addEventListener("click", () => {
  domManager.toggleButtons();
  domManager.toolbarDomManager.setDropDownOpen(true);
  document.getElementById("sortButton-content").style.display = "block";
});

const filterButton = document.querySelector("#filterButton");
filterButton.addEventListener("click", () => {
  domManager.toggleButtons();
  domManager.toolbarDomManager.setDropDownOpen(true);
  document.getElementById("filterButton-content").style.display = "block";
});

const helpButton = document.querySelector("#helpButton");
helpButton.addEventListener("click", () => {
  domManager.toggleButtons();
  domManager.toolbarDomManager.openHelpMessage();
});

const settingsButton = document.querySelector("#settingsButton");
settingsButton.addEventListener("click", () => {
  domManager.toggleButtons();
  domManager.toolbarDomManager.openSettingsMenu();
});

// Dynamic Click Events (for elements that are not always visible)
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("click", (e) => {
  // Sort/Filter Button
  /////////////////////////////////////////////////////////
  let didNotClickSortFilter = !e.target.closest(
    "#filterButton-content p, #filterButton, #sortButton-content p, #sortButton"
  );
  if (domManager.toolbarDomManager.getDropDownOpen() && didNotClickSortFilter) {
    document.getElementById("sortButton-content").style.display = "none";
    document.getElementById("filterButton-content").style.display = "none";
    domManager.toolbarDomManager.setDropDownOpen(false);
    domManager.toggleButtons();
    return;
  }

  let sortSelection = e.target.closest("#sortButton-content p");
  if (sortSelection) {
    domManager.todoDomManager.sortTodos(manager, sortSelection);
    document.getElementById("sortButton-content").style.display = "none";
    domManager.toolbarDomManager.setDropDownOpen(false);
    domManager.toggleButtons();
    return;
  }

  let filterSelection = e.target.closest("#filterButton-content p");
  if (filterSelection) {
    domManager.todoDomManager.filterTodos(manager, filterSelection);
    document.getElementById("filterButton-content").style.display = "none";
    domManager.toolbarDomManager.setDropDownOpen(false);
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // Todo Completed
  /////////////////////////////////////////////////////////
  let todoCompleted = e.target.closest(".todoCheckButton");
  if (todoCompleted) {
    const todo = manager.todoManager.getTodoByID(
      todoCompleted.parentNode.parentNode.dataset.todoID
    );
    domManager.todoDomManager.setTodoComplete(todo);
    manager.todoManager.setTodoComplete(todo);
    return;
  }
  /////////////////////////////////////////////////////////

  // Edit Todo
  /////////////////////////////////////////////////////////
  let openEditTodoForm = e.target.closest(".todoEditButton");
  if (openEditTodoForm) {
    domManager.toggleButtons();
    const todo = manager.todoManager.getTodoByID(
      openEditTodoForm.parentNode.parentNode.dataset.todoID
    );
    domManager.todoDomManager.openEditTodoForm(manager, todo);
    return;
  }

  let submitEditTodoForm = e.target.closest("#editTodoConfirmForm");
  if (submitEditTodoForm) {
    const todoBeingEdited = domManager.todoDomManager.getTodoBeingEdited();
    const editedTodoFields =
      domManager.todoDomManager.submitEditTodoForm(manager);
    manager.todoManager.updateTodo(todoBeingEdited, editedTodoFields);
    domManager.toggleButtons();
    return;
  }

  let closeEditTodoForm = e.target.closest("#editTodoCloseForm");
  if (closeEditTodoForm) {
    domManager.todoDomManager.closeEditTodoForm();
    domManager.toggleButtons();
    return;
  }

  let deleteTodoViaEditTodoForm = e.target.closest("#editTodoDeleteTodo");
  if (deleteTodoViaEditTodoForm) {
    const todoToDelete = domManager.todoDomManager.getTodoBeingEdited();
    domManager.todoDomManager.deleteTodoViaEditForm();
    manager.todoManager.deleteTodo(todoToDelete);
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // Full Todo
  /////////////////////////////////////////////////////////
  let showFullTodo = e.target.closest(".todoNote");
  if (showFullTodo) {
    domManager.toggleButtons();
    const todo = manager.todoManager.getTodoByID(showFullTodo.dataset.todoID);
    domManager.todoDomManager.showFullTodo(manager, todo);
    return;
  }

  let closeFullTodo = e.target.closest("#todoFullOverlayCloseButton");
  if (closeFullTodo) {
    domManager.todoDomManager.closeFullTodo();
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // New Todo
  /////////////////////////////////////////////////////////
  let closeNewTodoForm = e.target.closest("#newTodoCloseForm");
  if (closeNewTodoForm) {
    domManager.toggleButtons();
    domManager.toolbarDomManager.closeNewTodoForm();
    return;
  }

  let submitNewTodoForm = e.target.closest("#newTodoConfirmForm");
  if (submitNewTodoForm) {
    const newTodoFields =
      domManager.toolbarDomManager.submitNewTodoForm(manager);
    if (newTodoFields == null) {
      return;
    }
    const newTodo = manager.todoManager.addTodo(newTodoFields);
    domManager.todoDomManager.addTodoToDOM(manager, newTodo);
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // Edit Category
  /////////////////////////////////////////////////////////
  let openEditCategoryForm = e.target.closest(".editCategoryButton");
  if (openEditCategoryForm) {
    domManager.toggleButtons();
    const categoryID =
      openEditCategoryForm.parentNode.parentNode.dataset.categoryID;
    const category = manager.categoryManager.getCategoryByID(categoryID);
    domManager.categoryDomManager.openCategoryEditForm(manager, category);
    return;
  }

  let closeCategoryEditForm = e.target.closest("#editCategoryCloseForm");
  if (closeCategoryEditForm) {
    domManager.categoryDomManager.closeCategoryEditForm();
    domManager.toggleButtons();
    return;
  }

  let deleteCategoryEditForm = e.target.closest("#editCategoryDelete");
  if (deleteCategoryEditForm) {
    const categoryToDelete =
      domManager.categoryDomManager.getCategoryBeingEdited();
    if (
      manager.categoryManager.canDelete(
        categoryToDelete,
        manager.todoManager.todos
      )
    ) {
      domManager.categoryDomManager.deleteCategoryEditForm();
      manager.categoryManager.deleteCategory(categoryToDelete);
    } else {
      alert("Cannot Delete Category w/ Existing Todo's");
    }
    domManager.toggleButtons();
    return;
  }

  let colorSquareSelected = e.target.closest(".colorSquare");
  if (colorSquareSelected) {
    domManager.categoryDomManager.colorSelectedEditForm(colorSquareSelected);
    return;
  }

  let symbolSquareSelected = e.target.closest(".symbolPickerIcon");
  if (symbolSquareSelected) {
    domManager.categoryDomManager.symbolSelectedEditForm(symbolSquareSelected);
    return;
  }

  let submitCategoryEditForm = e.target.closest("#editCategoryConfirmForm");
  if (submitCategoryEditForm) {
    const categoryBeingEdited =
      domManager.categoryDomManager.getCategoryBeingEdited();
    const editedCategoryFields =
      domManager.categoryDomManager.submitCategoryEditForm();
    manager.categoryManager.updateCategory(
      categoryBeingEdited,
      editedCategoryFields
    );
    domManager.todoDomManager.updateTodosAfterCategoryEdit(
      manager,
      manager.todoManager.getTodosByCategoryID(categoryBeingEdited.categoryID)
    );
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // Help
  /////////////////////////////////////////////////////////
  let closeHelp = e.target.closest("#helpOverlayCloseButton");
  if (closeHelp) {
    domManager.toolbarDomManager.closeHelp();
    domManager.toggleButtons();
    return;
  }
  /////////////////////////////////////////////////////////

  // Settings
  /////////////////////////////////////////////////////////
  let closeSettings = e.target.closest("#settingsMenuClose");
  if (closeSettings) {
    domManager.toolbarDomManager.closeSettingsMenu();
    domManager.toggleButtons();
    return;
  }

  let clearMemory = e.target.closest("#settingsMenuClear");
  if (clearMemory) {
    localStorage.clear();
    location.reload();
    return;
  }
  /////////////////////////////////////////////////////////
});

// Dynamic Forms (For forms that are not alwyas visible)
/////////////////////////////////////////////////////////////////////////////
document.addEventListener("submit", (e) => {
  e.preventDefault();

  let submitNewCategoryForm = e.target.id == "newCategoryNameForm";
  if (submitNewCategoryForm) {
    const name = document.forms.newCategoryNameForm["newCategoryName"].value;
    const validForm = name.length > 2 && name.length < 12;

    if (!validForm) {
      alert("Names must be between 2 and 12 characters");
    } else {
      e.target.parentElement.removeChild(e.target);
      domManager.categoryDomManager.addCategoryToDOM(
        manager.categoryManager.addCategory(name)
      );
      addCategoryButton.style.display = "block";
    }
    domManager.toggleButtons();
  }

  let search = e.target.id == "search";
  if (search) {
    const searchTerm = document.forms.search["searchBar"].value;
    domManager.todoDomManager.filterTodos(manager, searchTerm);
  }
});

// Timed Fucntions
///////////////////////////////////////////////////////////////////////////////
setInterval(function () {
  domManager.todoDomManager.colorPastDue(manager.todoManager.todos);
}, 1000);

// Debug

///////////////////////////////////////////////////////////////////////////////
function doSomething() {
  //console.log("categories & todos")
  //console.log(manager.categoryManager.categories)
  //console.log(manager.todoManager.todos)
  //console.log("--------")
}

setInterval(doSomething, 10000); // Time in milliseconds
