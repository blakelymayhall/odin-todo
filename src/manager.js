import { TodoManager } from "./todoManager";
import { CategoryManager } from "./categoryManager";
import { isTomorrow, isToday, format } from "date-fns";

const Manager = () => {
    const todoManager = TodoManager();
    const categoryManager = CategoryManager();

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

    const loadState = () => {
        todoManager.todos = JSON.parse(localStorage.getItem("todoList"));
        categoryManager.categories = JSON.parse(localStorage.getItem("categoryList"));
        // cut the colors and symbols that are not available -- category manager
        // add categories and todos to dom -- respective managers
        // if null load default config
    };

    return {
        todoManager,
        categoryManager,
        GetFormattedDate,
        loadState
    }
}

function genID() {
    return Math.floor(Date.now() * Math.random());
};


export { Manager, genID };