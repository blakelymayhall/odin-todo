import EditCategoryButton from "../src/imgs/icons8-settings-30.png";

const CategoryDomManager = () => {
    let categoryBeingEdited = null;
    let colorSelected = null;
    let iconSelected = null;

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

    const openCategoryEditForm = (manager, category) => {
        categoryBeingEdited = category;

        document.querySelector("#editCategoryOverlay").style.display = "flex";
        document.querySelector("#editCategoryTitle").value = categoryBeingEdited.name;
        const colorPickerContainer = document.querySelector("#colorPicker");
        manager.categoryManager.categoryColors.forEach( (color) => {
            const colorSquare = document.createElement("div");
            colorSquare.classList.add("colorSquare");
            colorSquare.style.background = color;
            colorPickerContainer.appendChild(colorSquare);
        });

        const iconPickerContainer = document.querySelector("#iconPicker");
        manager.categoryManager.categoryImages.forEach( (icon) => {
            const iconSquare = document.createElement("img");
            iconSquare.classList.add("iconPickerIcon");
            iconSquare.src = icon;
            iconPickerContainer.appendChild(iconSquare);
        });
    };

    const closeCategoryEditForm = () => {
        document.querySelector("#editCategoryOverlay").style.display = "none";
        document.forms.editCategoryOverlay.reset();
        const toDelete = document.querySelectorAll(".colorSquare, .iconPickerIcon");
        toDelete.forEach((e) => {
            e.parentElement.removeChild(e);
        });
    };

    const colorSelectedEditForm = (colorSquare) => {
        if (colorSelected != null) {
            colorSelected.style.border = "none";
        } 
        
        if (colorSelected == colorSquare) {
            colorSelected = null;
            return;
        }

        colorSelected = colorSquare;
        colorSquare.style.border = "thick solid #0000FF";
    };

    const iconSelectedEditForm = (iconSquare) => {
        if (iconSelected != null) {
            iconSelected.style.border = "none";
        } 
        
        if (iconSelected == iconSquare) {
            iconSelected = null;
            return;
        }

        iconSelected = iconSquare;
        iconSelected.style.border = "thick solid #0000FF";
    };

    const submitCategoryEditForm = () => {
        const newCategoryName = document.forms.editCategoryOverlay["editCategoryTitle"].value;
        const validName = newCategoryName.length > 2 && newCategoryName.length < 12; 
        if (validName) {
            document.querySelector("#editCategoryOverlay").style.display = "none";
            document.forms.editCategoryOverlay.reset();
            const category = document.querySelector(`[data-category-i-d='${categoryBeingEdited.categoryID}']`);
            category.firstChild.textContent = newCategoryName;
            const newColor = colorSelected == null ? null : colorSelected.style.background;
            const newIcon = iconSelected == null ? null : iconSelected.src;
            const categoryIcon = category.querySelector(".categoryRowCategoryIcon");
            categoryIcon.src = newIcon;
            closeCategoryEditForm();
            return {
                categoryBeingEdited: categoryBeingEdited,
                editedCategoryFields: {
                    newCategoryName: newCategoryName,
                    newCategoryColor: newColor,
                    newCategoryIcon: newIcon
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
        closeCategoryEditForm();
    };

    return {
        addCategoryToDOM,
        getNewCategory,
        openCategoryEditForm,
        closeCategoryEditForm,
        colorSelectedEditForm,
        iconSelectedEditForm,
        submitCategoryEditForm,
        deleteCategoryEditForm
    }
};

export { CategoryDomManager };