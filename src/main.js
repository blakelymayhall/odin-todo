import { DomManager } from "./domManager";
import { Manager } from "./manager";
import "./style/styles.css";


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (!window.mobileCheck()) {
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
