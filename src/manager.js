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
        // Error check keys
        let loadErr = false;
        let keys = ["todoList", "categoryList"]
        keys.forEach( (key) => {
            if (JSON.parse(localStorage.getItem(key)) == null) {
                loadErr = true;
            }
        });

        if (loadErr) {
            return false;
        }

        // Load keys
        categoryManager.loadCategories(JSON.parse(localStorage.getItem(keys[1])));
        todoManager.loadTodos(JSON.parse(localStorage.getItem(keys[0])));
        
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