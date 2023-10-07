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
    }

    const getCategoryByID = (id) => {
        return categories.find( (category) => {
            return category.categoryID == id;
        });
    }

    const getTodoByID = (id) => {
        return todos.find( (todo) => {
            return todo.todoID == id;
        });
    }

    const addTodo = (name, desc, dueDate, category) => {
        let newTodo = Todo(name, desc, dueDate, category, false);
        todos.push(newTodo);
        return newTodo;
    }

    const updateTodo = (todoBeingEdited, newTodoName, newTodoDescription, newTodoDueDate, newTodoCategory) => {
        // does this update in the array?
        todoBeingEdited.name = newTodoName;
        todoBeingEdited.dueDate = newTodoDueDate
        todoBeingEdited.desc = newTodoDescription;
        todoBeingEdited.category = newTodoCategory;
    }

    const GetFormattedDate = (dueDate) => {
        let formattedDate;

        if (isToday(dueDate)) {
            formattedDate = "Today @ ";
        }
        else if (isTomorrow(dueDate)) {
            formattedDate = "Tomorrow @ ";
        }
        else {
            formattedDate = format(dueDate, "eeee, MMM d @ ");
        }
        
        formattedDate = formattedDate + format(dueDate, "h:mm a");
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