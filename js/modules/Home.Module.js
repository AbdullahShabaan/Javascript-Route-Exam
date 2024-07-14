class Home {
  constructor() {
    this.loaderEffect();
    this.sideBarAnimate(".open-btn");
  }
  async getMeals(name = "") {
    const req = fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await req;
    return data.json();
  }

  mealAnimate() {
    $(".meal-card")
      .on("mouseenter", function () {
        $(this).find(".overflow").animate({ bottom: "0" }, 500);
      })
      .on("mouseleave", function () {
        $(this).find(".overflow").animate({ bottom: "-100%" }, 500);
      });
  }

  sideBarAnimate(clickedElement) {
    const leftBy = $(".sidebar .links").innerWidth();
    $(".sidebar").css({ left: `-${leftBy}px` });

    $(clickedElement).on("click", this.sibeBarAction);
  }

  sibeBarAction() {
    $(".sidebar").toggleClass("active");
    $(".open-btn").toggleClass("fa-x");
    linksAnimate();
  }

  linksAnimate() {
    const open = document.querySelector(".sidebar.active");
    const ulHeight = $(".sidebar ul").innerHeight();
    if (open) {
      for (let i = 0; i < 5; i++) {
        $(".sidebar ul li")
          .eq(i)
          .animate({ top: "0" }, (i + 5) * 100);
      }
    } else {
      $(".sidebar ul li").animate({ top: `${ulHeight}px` }, 200);
    }
  }

  loaderEffect() {
    $("#main").fadeOut();
    $("#sidebar").fadeOut();
    $(".spinner-parent").fadeIn();

    $(function () {
      $(".spinner-parent").fadeOut(400, () => {
        $("#main").fadeIn();
        $("#sidebar").fadeIn();
        $("#sidebar").css({ visibility: "visible" });
      });
    });
  }
}
const home = new Home();
window.linksAnimate = home.linksAnimate;
export const getMealsMethod = home.getMeals;
export const mealAnimateMethod = home.mealAnimate;
export const sibeBarActionMethod = home.sibeBarAction;
