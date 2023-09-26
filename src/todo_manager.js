function genID() {
    return Math.floor(Date.now() * Math.random());
}

const Todo = (title, desc, dueDate, category, status) => {
    const todoID = genID();
    return {
        todoID
    }
};

//, color, symbol
const Category = (title) => {
    const categoryID = genID();
    return {
        categoryID,
        title
    }
};

export {
    Todo,
    Category
};