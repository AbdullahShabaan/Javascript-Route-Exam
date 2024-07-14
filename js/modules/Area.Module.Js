import { displayMainMethod } from "./Display.Module.js";
class Area {
  static async filterByArea(searchBy) {
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchBy}`
    );
    const data = await req.json();
    return data;
  }

  getMealsByArea() {
    $(".card-area").on("click", function () {
      $(".spinner-parent").fadeIn();
      $(".main").fadeOut();
      Area.filterByArea($(this).attr("data-name")).then((results) => {
        displayMainMethod(results);
      });
    });
  }
}
const area = new Area();
export const getMealsByArea = area.getMealsByArea;
