import { sibeBarActionMethod } from "./Home.Module.js";
import {
  displayHomeMethod,
  displayCategories,
  displayAreaMethod,
  displayIngrediantMethod,
  displayContactMethod,
  displaySearchMethod,
} from "./Display.Module.js";

class Search {
  constructor() {
    this.showSearchPage();
  }

  showSearchPage() {
    $(".sidebar ul li").on("click", function (e) {
      $(".details-content").html("");
      if (e.target.dataset.search === "search") {
        $("#main").fadeIn();
        displaySearchMethod();
        Search.searching();
        $(".contact-us").html("");
      } else if (e.target.dataset.search === "contact") {
        $(".search").html("");
        displayContactMethod();
      } else {
        $("#main").fadeIn();
        $(".contact-us").html("");
        $(".search").html("");
        Search.showMeals(e.target.dataset.search, e.target.dataset.name);
      }
      sibeBarActionMethod();
    });
  }

  static showMeals(target, name) {
    $(".spinner-parent").fadeIn();
    $(".main").fadeOut();
    Search.getMealsBy(target).then((data) => {
      $(".spinner-parent").fadeOut();
      $(".main").fadeIn();
      if (target == "categories") {
        displayCategories(data.categories);
      } else if (name == "area") {
        displayAreaMethod(data.meals);
      } else if (name == "ingredients") {
        displayIngrediantMethod(data.meals);
      }
    });
  }

  static searching() {
    $(".name").on("keyup", function () {
      displayHomeMethod(this.value);
    });
    $(".letter").on("keyup", function () {
      if (this.value.length == 1) {
        displayHomeMethod(this.value);
      }
    });
  }

  static async getMealsBy(searchBy) {
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/${searchBy}.php`
    );
    const data = await req.json();
    return data;
  }
}

export default Search;
