import { displayMainMethod } from "./Display.Module.js";
class Ingredient {
  static async filterByIngredient(searchBy) {
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBy}`
    );
    const data = await req.json();
    return data;
  }

  getMealsByIngredients() {
    $(".card-ingredient").on("click", function () {
      $(".spinner-parent").fadeIn();
      $(".main").fadeOut();
      Ingredient.filterByIngredient($(this).attr("data-name")).then(
        (results) => {
          displayMainMethod(results);
        }
      );
    });
  }
}
const ingredient = new Ingredient();
export const getMealsByIngredient = ingredient.getMealsByIngredients;
