import { displayMainMethod } from "./Display.Module.js";
class Category {
  static async filterByCategory(searchBy) {
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchBy}`
    );
    const data = await req.json();
    return data;
  }

  getMealsByCategory() {
    $(".category-card").on("click", function () {
      $(".spinner-parent").fadeIn();
      $(".main").fadeOut();
      Category.filterByCategory($(this).attr("data-name")).then((results) => {
        displayMainMethod(results);
      });
    });
  }
}
const cat = new Category();
export const getMealsByCat = cat.getMealsByCategory;
