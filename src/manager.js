import { TodoManager } from "./todoManager";
import { CategoryManager } from "./categoryManager";
import { isTomorrow, isToday, format } from "date-fns";

const Manager = () => {
    const todoManager = TodoManager();
    const categoryManager = CategoryManager();

    const GetFormattedDate = (date) => {

        if (typeof date === 'string' || date instanceof String) {
            date = Date.parse(date);
        }

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
        //return false;
        // Error check keys
        let keys = ["todoList", "categoryList"]
        keys.forEach( (key) => {
            if (JSON.parse(localStorage.getItem(key)) == null) {
                return false;
            }
        });

        // Load keys
        todoManager.loadTodos(JSON.parse(localStorage.getItem(keys[0])));
        categoryManager.loadCategories(JSON.parse(localStorage.getItem(keys[1])));

        return true;
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