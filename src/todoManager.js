import { genID } from "./manager";

const TodoManager = () => {

    let todos = [];

    const loadTodos = (loadedTodos) => {
        loadedTodos.forEach( (todo) => {
            todos.push(todo);
        });
    };

    const addTodo = (newTodoFields) => {
        let newTodo = Todo(newTodoFields.newTodoName, 
            newTodoFields.newTodoDescription, 
            newTodoFields.newTodoDueDate, 
            newTodoFields.newTodoCategoryID, 
            false);
        todos.push(newTodo);
        localStorage.setItem("todoList", JSON.stringify(todos));
        return newTodo;
    };

    const updateTodo = (todoBeingEdited, editedTodoFields) => {
        todoBeingEdited.name = editedTodoFields.newTodoName;
        todoBeingEdited.dueDate = editedTodoFields.newTodoDueDate
        todoBeingEdited.desc = editedTodoFields.newTodoDescription;
        todoBeingEdited.categoryID = editedTodoFields.newTodoCategoryID;
        localStorage.setItem("todoList", JSON.stringify(todos));
    };

    const deleteTodo = (todoToDelete) => {
        const todoIdx = todos.indexOf( (todo) => {
            return todo.todoID == todoToDelete;
        });
        todos.splice(todoIdx,1);
        localStorage.setItem("todoList", JSON.stringify(todos));
    };

    const getTodoByID = (id) => {
        return todos.find( (todo) => {
            return todo.todoID == id;
        });
    };

    const getTodosByCategoryID = (id) => {
        return todos.filter( (todo) => {
            return todo.categoryID == id && todo.status == 0;
        });
    };

    const setTodoComplete = (todo) => {
        todo.status = 1;
        localStorage.setItem("todoList", JSON.stringify(todos));
    };

    return {
        todos,
        loadTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        getTodoByID,
        getTodosByCategoryID,
        setTodoComplete
    };
};

const Todo = (name, desc, dueDate, categoryID, status = 0) => {

    const todoID = genID();

    return {
        todoID,
        name,
        desc,
        dueDate,
        categoryID,
        status
    };
};

export {TodoManager, Todo}