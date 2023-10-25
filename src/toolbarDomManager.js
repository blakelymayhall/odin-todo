import { is } from "date-fns/locale";

const ToolbarDomManager = () => {

    let dropDownOpen = false;

    const openNewTodoForm = (manager) => {
        document.querySelector("#newTodoOverlay").style.display = "flex";
        manager.categoryManager.categories.forEach( (category) => {
            const categoryOption = document.createElement("option");
            categoryOption.value=category.categoryID;
            categoryOption.text=category.name;
            document.querySelector("#newTodoCategory").appendChild(categoryOption);
        });
    };

    const submitNewTodoForm = (manager) => {
        const newTodoName = document.forms.newTodoOverlay["newTodoTitle"].value;
        const newTodoDescription = document.forms.newTodoOverlay["newTodoDescription"].value;
        const newTodoDueDate = new Date(document.forms.newTodoOverlay["newTodoDueDate"].value);
        const newTodoCategoryID = document.forms.newTodoOverlay["newTodoCategory"].value;
        if(validTodoInput(newTodoName, newTodoDueDate)) {
            document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
            document.querySelector("#newTodoOverlay").style.display = "none";
            document.forms.newTodoOverlay.reset();
            const toDelete = document.querySelectorAll("#newTodoCategory option")
            toDelete.forEach((e) => {
                e.parentElement.removeChild(e);
            });
            
            return {
                newTodoName, 
                newTodoDescription, 
                newTodoDueDate, 
                newTodoCategoryID
            };
        }
        
        return null;
    }

    const closeNewTodoForm = () => {
        document.querySelector("#addCategoryButton").style.pointerEvents = "auto";
        document.querySelector("#newTodoOverlay").style.display = "none";
        document.forms.newTodoOverlay.reset();
        const toDelete = document.querySelectorAll("#newTodoCategory option")
        toDelete.forEach((e) => {
            e.parentElement.removeChild(e);
        });
    };

    const getDropDownOpen = () => {
        return dropDownOpen;
    }

    const setDropDownOpen = (isOpen) => {
        dropDownOpen = isOpen;
    }

    const openHelpMessage = () => {
        document.querySelector("#helpOverlay").style.display = "flex";
    };

    const closeHelp = () => {
        document.querySelector("#helpOverlay").style.display = "none";
    };

    const openSettingsMenu = () => {
        document.querySelector("#settingsMenu").style.display = "flex";
    };

    const closeSettingsMenu = () => {
        document.querySelector("#settingsMenu").style.display = "none";
    };

    // Support Functions
    const validTodoInput = (newTodoName, newTodoDueDate, isEdit = false) => {
        const validName = newTodoName.length > 2 && newTodoName.length < 12; 
        if (!validName) {
            alert("Names must be between 2 and 12 characters");
            return false;
        }
    
        const validDate = newTodoDueDate != "" && newTodoDueDate != null && 
            (new Date(newTodoDueDate) > new Date() || isEdit); // Check against current date
        if (!validDate) {
            alert("Date must be future date");
            return false;
        }
    
        return true;
    };

    return {
        openNewTodoForm,
        submitNewTodoForm,
        closeNewTodoForm,
        getDropDownOpen,
        setDropDownOpen,
        openHelpMessage,
        closeHelp,
        openSettingsMenu,
        closeSettingsMenu
    }
};

export { ToolbarDomManager }