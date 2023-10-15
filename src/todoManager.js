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
        return newTodo;
    };

    const updateTodo = (todoBeingEdited, editedTodoFields) => {
        todoBeingEdited.name = editedTodoFields.newTodoName;
        todoBeingEdited.dueDate = editedTodoFields.newTodoDueDate
        todoBeingEdited.desc = editedTodoFields.newTodoDescription;
        todoBeingEdited.category = editedTodoFields.newTodoCategory;
    };

    const deleteTodo = (todoToDelete) => {
        const todoIdx = todos.indexOf( (todo) => {
            return todo.todoID == todoToDelete;
        });
        todos.splice(todoIdx,1);
    };

    const getTodoByID = (id) => {
        return todos.find( (todo) => {
            return todo.todoID == id;
        });
    };

    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        getTodoByID
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