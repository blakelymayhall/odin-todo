// Export Functions
const Manager = () => {
    // const categoryImages = array of images imported
    // let availableCategoryImages = categoryImages;   // do we need the first variable? if a cat. is deleted we could push onto here
    // do the same thing with colors 
    
    let categories = [];
    let todos = [];

    const addCategory = (name) => {
        // randomize number in availableCategoryImages, and remove from array
        let newCategory = Category(name);
        categories.push(newCategory);
        return newCategory;
    };

    const getCategoryByName = (name) => {
        return categories.find( (category) => {
            return category.name == name;
        });
    }

    const addTodo = (name, desc, dueDate, category) => {
        let newTodo = Todo(name, desc, dueDate, category, false);
        todos.push(newTodo);
        return newTodo;
    }

    return {
        categories,
        todos,
        addCategory,
        addTodo,
        getCategoryByName
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

//, color, symbol
const Category = (name) => {
    const categoryID = genID();
    return {
        categoryID,
        name
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