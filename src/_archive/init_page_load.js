import EditCategoryButton from "../src/imgs/icons8-settings-30.png"
import AddCategoryButton from "../src/imgs/icons8-plus-30.png"
import AddToDoButton from "../src/imgs/icons8-plus-50.png"
import FilterButton from "../src/imgs/icons8-filter-50.png"
import SortButton from "../src/imgs/icons8-sort-32.png"
import SearchIcon from "../src/imgs/icons8-magnifying-glass-50.png"
import HelpButton from "../src/imgs/icons8-help-50.png"
import SettingsButton from "../src/imgs/icons8-settings-96.png"
import Pushpin from "../src/imgs/icons8-push-pin-50.png"
import TodoEditButton from "../src/imgs/icons8-edit-50.png"
import TodoCategory from "../src/imgs/icons8-ghost-50.png"

const initPageLoad = () => {
    loadImageAssets();
}

function loadImageAssets() {
    document.querySelector("#editCategoryButton").src = EditCategoryButton;
    document.querySelector("#addCategoryButton").src = AddCategoryButton;
    document.querySelector("#addToDoButton").src = AddToDoButton;
    document.querySelector("#filterButton").src = FilterButton;
    document.querySelector("#sortButton").src = SortButton;
    document.querySelector("#searchIcon").src = SearchIcon;
    document.querySelector("#helpButton").src = HelpButton;
    document.querySelector("#settingsButton").src = SettingsButton;
    document.querySelector(".pushpin").src = Pushpin;
    document.querySelector(".todoEditButton").src = TodoEditButton;
    document.querySelector(".todoCategory").src = TodoCategory;

};

export { initPageLoad };