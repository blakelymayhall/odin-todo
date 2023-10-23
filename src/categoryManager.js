import GhostCategory from "../src/imgs/category_imgs/icons8-ghost-50.png";
import ShoeCategory from "../src/imgs/category_imgs/icons8-shoe-50.png";
import ToyCategory from "../src/imgs/category_imgs/icons8-toy-50.png";
import CarCategory from "../src/imgs/category_imgs/icons8-car-50.png";
import BookCategory from "../src/imgs/category_imgs/icons8-book-50.png";
import DogCategory from "../src/imgs/category_imgs/icons8-dog-50.png";
import WineCategory from "../src/imgs/category_imgs/icons8-drink-50.png";

import { genID } from "./manager";

const CategoryManager = () => {
    
    let categoryImages = [GhostCategory,ShoeCategory,ToyCategory,CarCategory,BookCategory,DogCategory,WineCategory];
    let categoryColors = ["Aqua","Aquamarine","BurlyWood","LightGray","PowderBlue","Yellow","HoneyDew"]

    let categories = [];

    const loadCategories = (loadedCategories) => {
        loadedCategories.forEach( (category) => {
            categories.push(category);
            const colorIdx = categoryColors.indexOf( (color) => {
                return color == category.color;
            });
            categoryImages.splice(colorIdx,1);

            const imgIdx = categoryImages.indexOf( (img) => {
                return img == category.symbol;
            });
            categoryImages.splice(imgIdx,1);
        });
    };

    const addCategory = (name) => {
        let rndIdx = Math.floor(Math.random()*categoryImages.length);
        let newCategory = Category(name, categoryColors[rndIdx], categoryImages[rndIdx]);
        categoryImages.splice(rndIdx,1);
        categoryColors.splice(rndIdx,1);
        categories.push(newCategory);

        localStorage.setItem("categoryList", JSON.stringify(categories));
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

    const updateCategory = (categoryBeingEdited, editedCategoryFields) => {
        categoryBeingEdited.name = editedCategoryFields.newCategoryName;

        if (editedCategoryFields.newCategoryColorIndex != null) {
            categoryColors.push(categoryBeingEdited.color);
            categoryBeingEdited.color = categoryColors[editedCategoryFields.newCategoryColorIndex];
            categoryColors.splice(categoryColors.indexOf(categoryBeingEdited.color),1);
        }

        if (editedCategoryFields.newCategorySymbolIndex != null) {
            categoryImages.push(categoryBeingEdited.symbol);
            categoryBeingEdited.symbol = categoryImages[editedCategoryFields.newCategorySymbolIndex];
            categoryImages.splice(categoryImages.indexOf(categoryBeingEdited.symbol),1);
        }

        localStorage.setItem("categoryList", JSON.stringify(categories));
    };

    const canDelete = (categoryToDelete, todos) => {
        let canDelete = true;
        todos.forEach( (todo) => {
            if (todo.category == categoryToDelete) {
                canDelete = false;
            }
        });
        return canDelete;
    };

    const deleteCategory = (categoryToDelete) => {
        const categoryIdx = categories.indexOf( (category) => {
            return category.categoryID == categoryToDelete;
        });
        categoryImages.push(categoryToDelete.symbol);
        categoryColors.push(categoryToDelete.color);
        categories.splice(categoryIdx,1);

        localStorage.setItem("categoryList", JSON.stringify(categories));
    };

    return {
        categories,
        categoryImages,
        categoryColors,
        loadCategories,
        addCategory,
        getCategoryByName,
        getCategoryByID,
        updateCategory,
        canDelete,
        deleteCategory
    };
};

const Category = (name, color, symbol) => {

    const categoryID = genID();

    return {
        categoryID,
        name,
        color,
        symbol
    };
};

export {CategoryManager, Category}