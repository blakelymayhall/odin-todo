const ToolbarDomManager = () => {

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
        const newTodoCategory = manager.categoryManager.getCategoryByID(document.forms.newTodoOverlay["newTodoCategory"].value);
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
                newTodoCategory
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

    const openHelpMessage = () => {
        document.querySelector("#helpOverlay").style.display = "flex";
    };

    const closeHelp = () => {
        document.querySelector("#helpOverlay").style.display = "none";
    };

    return {
        openNewTodoForm,
        submitNewTodoForm,
        closeNewTodoForm,
        openHelpMessage,
        closeHelp
    }
};

export { ToolbarDomManager }