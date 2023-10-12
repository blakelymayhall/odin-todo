import GhostCategory from "../src/imgs/category_imgs/icons8-ghost-50.png";
import ShoeCategory from "../src/imgs/category_imgs/icons8-shoe-50.png";
import ToyCategory from "../src/imgs/category_imgs/icons8-toy-50.png";
import CarCategory from "../src/imgs/category_imgs/icons8-car-50.png";
import BookCategory from "../src/imgs/category_imgs/icons8-book-50.png";
import DogCategory from "../src/imgs/category_imgs/icons8-dog-50.png";
import WineCategory from "../src/imgs/category_imgs/icons8-drink-50.png";
import {isTomorrow, isToday, format } from "date-fns";

// Export Functions
const Manager = () => {
    const categoryImages = [GhostCategory,ShoeCategory,ToyCategory,CarCategory,BookCategory,DogCategory,WineCategory];
    let availableCategoryImages = categoryImages;   // do we need the first variable? if a cat. is deleted we could push onto here?
    const categoryColors = ["Aqua","Aquamarine","BurlyWood","LightGray","PowderBlue","Yellow","HoneyDew"]
    let availableCategoryColors = categoryColors;

    let categories = [];
    let todos = [];

    const addCategory = (name) => {
        let rndIdx = Math.floor(Math.random()*availableCategoryImages.length);
        let newCategory = Category(name, availableCategoryColors[rndIdx], availableCategoryImages[rndIdx]);
        availableCategoryImages.splice(rndIdx,1);
        availableCategoryColors.splice(rndIdx,1);
        categories.push(newCategory);
        return newCategory;
    };

    const getCategoryByName = (name) => {
        return categories.find( (category) => {
            return category.name == name;
        });
    };

    const getCategoryByID = (id) => {
        return categories.find( (category) => {
            return category.categoryID == id;
        });
    };

    const getTodoByID = (id) => {
        return todos.find( (todo) => {
            return todo.todoID == id;
        });
    };

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
        // does this update in the array?
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

    const updateCategory = (categoryBeingEdited, editedCategoryFields) => {
        categoryBeingEdited.name = editedCategoryFields.newCategoryName;
    }

    const deleteCategory = (categoryToDelete) => {
        const categoryIdx = categories.indexOf( (category) => {
            return category.categoryID == categoryToDelete;
        });
        categories.splice(categoryIdx,1);
    }

    const GetFormattedDate = (date) => {
        let formattedDate;

        if (isToday(date)) {
            formattedDate = "Today @ ";
        }
        else if (isTomorrow(date)) {
            formattedDate = "Tomorrow @ ";
        }
        else {
            formattedDate = format(date, "eeee, MMM d @ ");
        }
        
        formattedDate = formattedDate + format(date, "h:mm a");
        return formattedDate;
    };


    return {
        categories,
        todos,
        addCategory,
        addTodo,
        getCategoryByName,
        getCategoryByID,
        getTodoByID,
        updateTodo,
        deleteTodo,
        updateCategory,
        deleteCategory,
        GetFormattedDate
    }
}

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

const Category = (name, color, symbol) => {
    const categoryID = genID();
    return {
        categoryID,
        name,
        color,
        symbol
    }
};

// Support Functions
function genID() {
    return Math.floor(Date.now() * Math.random());
}

export {
    Manager,
    Todo,
    Category
};