import { displayDetailsMethod } from "./Display.Module.js";
class Details {
  async getDetails(id) {
    const req = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await req.json();
    return data;
  }
  getID() {
    $(".meal-card").on("click", function () {
      $(".spinner-parent").fadeIn();
      $("#details").fadeIn();
      $("#main").fadeOut();
      window.getDetails(this.dataset.id).then((data) => {
        $(".spinner-parent").fadeOut(0, () => {
          displayDetailsMethod(data.meals[0]);
        });
      });
    });
  }
}

let details = new Details();
window.getDetails = details.getDetails;
export const getIdMethod = details.getID;
