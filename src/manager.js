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

    return {
        todoManager,
        categoryManager,
        GetFormattedDate
    }
}

function genID() {
    return Math.floor(Date.now() * Math.random());
};


export { Manager, genID };