import EditCategoryButton from "../src/imgs/icons8-settings-30.png";

const CategoryDomManager = () => {
    let categoryBeingEdited = null;

    const addCategoryToDOM = (category) => {
        const categoryRow = document.createElement("li");
        categoryRow.classList.add("categoryRow");
        categoryRow.dataset.categoryID = category.categoryID;
        const categoryName = document.createElement("p");
        categoryName.textContent = category.name;
        const categroyRowImages = document.createElement("div");
        categroyRowImages.classList.add("categroyRowImages");
        const categoryRowCategoryIcon = document.createElement("img");
        categoryRowCategoryIcon.src = category.symbol;
        categoryRowCategoryIcon.classList.add("categoryRowCategoryIcon");
        const editCategoryButton = document.createElement("img");
        editCategoryButton.src = EditCategoryButton;
        editCategoryButton.classList.add("editCategoryButton");
        categroyRowImages.appendChild(categoryRowCategoryIcon);
        categroyRowImages.appendChild(editCategoryButton);
        categoryRow.appendChild(categoryName);
        categoryRow.appendChild(categroyRowImages);
        const seperator = document.createElement("li");
        seperator.classList.add("seperator");
        const addCategoryButton = document.querySelector("#addCategoryButton");
        document.querySelector("#categoryList").insertBefore(categoryRow,addCategoryButton);
        document.querySelector("#categoryList").insertBefore(seperator,addCategoryButton);
    };

    const getNewCategory = () =>  {
        const addCategoryButton = document.querySelector("#addCategoryButton");
        addCategoryButton.style.display = "none";
        const newCategoryNameForm = document.createElement("form");
        newCategoryNameForm.setAttribute("id", "newCategoryNameForm");
        const newCategoryName = document.createElement("input");
        newCategoryName.setAttribute("id", "newCategoryName");
        newCategoryName.autofocus=true;
        newCategoryName.type="text";
        newCategoryName.minlength="2";
        newCategoryName.maxlength="20";
        newCategoryNameForm.appendChild(newCategoryName);
        document.querySelector("#categoryList").insertBefore(newCategoryNameForm,addCategoryButton);
    }

    function openCategoryEditForm(manager, category) {
        categoryBeingEdited = category;

        document.querySelector("#editCategoryOverlay").style.display = "flex";
        document.querySelector("#editCategoryTitle").value = categoryBeingEdited.name;

        // color
        // image
    };

    const submitCategoryEditForm = () => {
        const newCategoryName = document.forms.editCategoryOverlay["editCategoryTitle"].value;
        const validName = newCategoryName.length > 2 && newCategoryName.length < 12; 
        if (validName) {
            document.querySelector("#editCategoryOverlay").style.display = "none";
            document.forms.editCategoryOverlay.reset();
            const category = document.querySelector(`[data-category-i-d='${categoryBeingEdited.categoryID}']`);
            category.firstChild.textContent = newCategoryName;
            return {
                categoryBeingEdited: categoryBeingEdited,
                editedCategoryFields: {
                    newCategoryName
                }
            }
        }
        else {
            alert("Names must be between 2 and 12 characters");
            return null;
        }
    };

    const deleteCategoryEditForm = () => {
        document.querySelector("#editCategoryOverlay").style.display = "none";
        document.forms.editCategoryOverlay.reset();
        const category = document.querySelector(`[data-category-i-d='${categoryBeingEdited.categoryID}']`);
        category.parentNode.removeChild(category);
    };

    return {
        addCategoryToDOM,
        getNewCategory,
        openCategoryEditForm,
        submitCategoryEditForm,
        deleteCategoryEditForm
    }
};

export { CategoryDomManager };