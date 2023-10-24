import AddCategoryButton from "../src/imgs/icons8-plus-30.png";
import AddToDoButton from "../src/imgs/icons8-plus-50.png";
import FilterButton from "../src/imgs/icons8-filter-50.png";
import SortButton from "../src/imgs/icons8-sort-32.png";
import SearchIcon from "../src/imgs/icons8-magnifying-glass-50.png";
import HelpButton from "../src/imgs/icons8-help-50.png";
import SettingsButton from "../src/imgs/icons8-settings-96.png";

import { ToolbarDomManager } from "./toolbarDomManager";
import { TodoDomManager } from "./todoDomManager";
import { CategoryDomManager } from "./categoryDomManager";

const DomManager = () => {
    const toolbarDomManager = ToolbarDomManager();
    const todoDomManager = TodoDomManager();
    const categoryDomManager = CategoryDomManager();
    
    const loadImageAssets = () => {
        document.querySelector("#addCategoryButton").src = AddCategoryButton;
        document.querySelector("#addToDoButton").src = AddToDoButton;
        document.querySelector("#filterButton").src = FilterButton;
        document.querySelector("#sortButton").src = SortButton;
        document.querySelector("#searchIcon").src = SearchIcon;
        document.querySelector("#helpButton").src = HelpButton;
        document.querySelector("#settingsButton").src = SettingsButton;
    };

    let toggle = true;
    const toggleButtons = () => {
        toggle = !toggle;
        let ptrEvents = toggle ? "auto" : "none";
        document.querySelector("#addCategoryButton").style.pointerEvents = ptrEvents;
        document.querySelector("#addToDoButton").style.pointerEvents = ptrEvents;
        document.querySelector("#filterButton").style.pointerEvents = ptrEvents;
        document.querySelector("#sortButton").style.pointerEvents = ptrEvents;
        document.querySelector("#searchBar").style.pointerEvents = ptrEvents;
        document.querySelector("#settingsButton").style.pointerEvents = ptrEvents;
        document.querySelector("#helpButton").style.pointerEvents = ptrEvents;
        const buttons = document.querySelectorAll(".editCategoryButton,.todoEditButton,.todoCheckButton,.todoNote");
        buttons.forEach( (button) => {
            button.style.pointerEvents = ptrEvents;
        })
    };

    const getButtonToggleState = () => {
        return toggle;
    }

    loadImageAssets();

    return {
        toolbarDomManager,
        todoDomManager,
        categoryDomManager,
        loadImageAssets,
        toggleButtons,
        getButtonToggleState
    }
};

export {DomManager}