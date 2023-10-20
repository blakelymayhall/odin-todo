import { genID } from "./manager";

const TodoManager = () => {

    let todos = [];

    const addTodo = (newTodoFields) => {
        let newTodo = Todo(newTodoFields.newTodoName, 
            newTodoFields.newTodoDescription, 
            newTodoFields.newTodoDueDate, 
            newTodoFields.newTodoCategory, 
            false);
        todos.push(newTodo);
        localStorage.setItem("todoList", JSON.stringify(todos));
        return newTodo;
    };

    const updateTodo = (todoBeingEdited, editedTodoFields) => {
        todoBeingEdited.name = editedTodoFields.newTodoName;
        todoBeingEdited.dueDate = editedTodoFields.newTodoDueDate
        todoBeingEdited.desc = editedTodoFields.newTodoDescription;
        todoBeingEdited.category = editedTodoFields.newTodoCategory;
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
            return todo.category.categoryID == id;
        });
    };

    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        getTodoByID,
        getTodosByCategoryID
    }

};

const Todo = (name, desc, dueDate, category, status) => {

    const todoID = genID();

    return {
        todoID,
        name,
        desc,
        dueDate,
        category,
        status
    }
};

export {TodoManager, Todo}