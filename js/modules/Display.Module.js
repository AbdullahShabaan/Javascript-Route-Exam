import { getMealsMethod, mealAnimateMethod } from "./Home.Module.js";
import { getIdMethod } from "./Details.Module.js";
import { getMealsByCat } from "./Category.Module.js";
import { getMealsByArea } from "./Area.Module.Js";
import { getMealsByIngredient } from "./Ingredient.Module.js";
import { validationMethod } from "./Contact.Module.js";
class Display {
  constructor() {
    Display.displayHome();
  }

  static displayMain(result) {
    $(".spinner-parent").fadeOut();
    $(".main").fadeIn();
    const { meals } = result;
    let content = ``;
    meals
      ? meals.forEach((meal) => {
          const { strMeal, strMealThumb, idMeal } = meal;
          content += `
      <div class="col-md-3 meal-card" data-id="${idMeal}">
                  <div class="card-photo overflow-hidden rounded-3 position-relative">
                      <div class="overflow position-absolute w-100 h-100 start-0  d-flex align-items-center">
                          <h3 class="text-black ps-2">${strMeal}</h3>
                      </div>
                      <img src="${strMealThumb}" class="w-100" alt="${strMeal}">
                  </div>
              </div>
      `;
        })
      : "";
    $(".main").html(content);
    getIdMethod();
    mealAnimateMethod();
  }
  static displayHome(name = "") {
    if (name != "") {
      $(".spinner-parent").fadeIn();
      $(".main").fadeOut();
    }
    getMealsMethod(name).then((result) => {
      Display.displayMain(result);
    });
  }

  static displayByCategory(data) {
    let content = ``;
    data.forEach((meal) => {
      const { strCategory, strCategoryThumb, strCategoryDescription } = meal;
      const description = strCategoryDescription
        .split(" ")
        .slice(0, 20)
        .join(" ");

      content += `       
                <div class="col-md-3 meal-card category-card" data-name="${strCategory}">
                    <div class="card-photo overflow-hidden rounded-3 position-relative">
                        <div class="overflow position-absolute w-100 h-100 start-0  text-center py-2 ">
                            <h3 class="text-black">${strCategory}</h3>
                            <p>${description}</p>
                        </div>
                        <img src="${strCategoryThumb}" class="w-100" alt="${strCategory}">
                    </div>
                </div>`;
    });
    $(".main").html(content);
    getMealsByCat();
    mealAnimateMethod();
  }

  static displayArea(data) {
    let content = ``;
    data.forEach((meal) => {
      const { strArea } = meal;
      content += `<div class="col-md-3 card-area" data-name="${strArea}">
                    <div class="card-photo overflow-hidden rounded-3 position-relative text-white text-center">                   
                        <i class="fa-solid fa-house-laptop fa-4x "></i>
                        <h3>${strArea}</h3>
                    </div>
                </div>`;
    });
    $(".main").html(content);
    getMealsByArea();
    mealAnimateMethod();
  }

  static displayIngrediant(data) {
    let content = ``;
    const mealsData = data.splice(0, 20);
    mealsData.forEach((meal) => {
      const { strIngredient, strDescription, idIngredient } = meal;
      const description = strDescription?.split(" ").slice(0, 20).join(" ");

      content += `<div class="col-md-3 card-ingredient text-white text-center" data-name="${strIngredient}">
                    <div class="card-photo overflow-hidden rounded-3 position-relative ">                   
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    </div>
                    <div class="info w-100 py-2">
                      <h3>${strIngredient}</h3>
                      <p>${description}</p>
                    </div>
                </div>`;
    });
    $(".main").html(content);
    getMealsByIngredient();
    mealAnimateMethod();
  }

  static displayDetails(data) {
    const {
      strArea,
      strCategory,
      strYoutube,
      strTags,
      strInstructions,
      strMeal,
      strMealThumb,
      strSource,
    } = data;
    const tags = strTags?.split(",");

    let ingredientData = [];
    for (let i = 1; i <= 10; i++) {
      if (data[`strIngredient${i}`]) {
        ingredientData.push(
          `${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}`
        );
      }
    }

    let content = ` 
     <div class="col-md-4">
                    <div class="image overflow-hidden rounded-2">
                        <img class="w-100" src="${strMealThumb}" alt="">
                    </div>
                    <h3 class="fs-title">${strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${strInstructions}</p>
                    <h3><span class="fw-bolder">Area :</span> ${strArea}</h3>
                    <h3><span class="fw-bolder">Category :</span> ${strCategory}</h3>
                    <h3><span class="fw-bolder">Recipes :</span>
                    </h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                    ${
                      ingredientData
                        ? ingredientData
                            .filter((e) => e)
                            .map(
                              (e) =>
                                `<li class="alert alert-info m-2 p-1">${e}</li>`
                            )
                            .join("")
                        : ""
                    }
                    </ul>

                    <h3><span class="fw-bolder">Tags :</span></h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                    ${
                      tags
                        ? tags
                            .filter((e) => e)
                            .map(
                              (e) =>
                                `<li class="alert alert-danger m-2 p-1">${e}</li>`
                            )
                            .join("")
                        : ` <li class="alert alert-danger m-2 p-1">no tags available</li>`
                    }
                        
                    </ul>
                    <a href="${strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${strYoutube}"  target="_blank" class="btn btn-danger">Youtube</a>
                </div>
                `;
    $(".details-content").html(content);
  }

  static displaySearch() {
    let content = `
            <div class="container ">
            <form action="" class="px-5 pt-4 row">
            <div class="col-md-6 pt-4">
            <input class="name form-control bg-transparent" placeholder="Search By Name" type="text">
            </div>
            <div class="col-md-6 pt-4">
                <input class="letter form-control bg-transparent col-md-6" placeholder="Search By First Letter" type="text" maxlength="1">
            </div>
            </form>
            </div>`;
    $(".search").html(content);
    $(".main").html("");
  }

  static displayContact() {
    let content = `
         <div class="container vh-100 position-absolute top-50 start-50 translate-middle">
            <form action="" class="w-75 m-auto text-center position-relative z-0 top-50 translate-middle-y">
                        <div class="row g-2">
                                     <div class="col-md-6">
                                       <input id="user-name" type="text" name="name" class="form-control mb-4" placeholder="Enter Your Name">
                                     </div>
                                     <div class="col-md-6">
                                       <input id="user-number" type="text" class=" form-control mb-4" placeholder="Enter Your Phone">                           
                                     </div>
                                     <div class="col-md-6">
                                       <input id="user-email" type="email" class=" form-control mb-4" placeholder="Enter Your Email">
                                     </div>
                                     <div class="col-md-6">
                                       <input id="user-age" type="number" class="form-control mb-4" placeholder="Enter Your Age">
                                     </div>
                                     <div class="col-md-6">
                                       <input id="user-password" type="password" class="form-control mb-4" placeholder="Enter Your Password">
                                     </div>
                                     <div class="col-md-6">
                                       <input id="user-repassword" type="password" class=" form-control mb-4" placeholder="Repassword">
                                     </div>     
                        </div>           
                  <button class="btn btn-outline-danger m-auto " disabled>Submit</button>
              </form>
            </div>


`;
    $(".contact-us").html(content);
    $(".main").html("");
    validationMethod();
  }
}
export default Display;
export const displayDetailsMethod = Display.displayDetails;
export const displayHomeMethod = Display.displayHome;
export const displayCategories = Display.displayByCategory;
export const displayMainMethod = Display.displayMain;
export const displayAreaMethod = Display.displayArea;
export const displayIngrediantMethod = Display.displayIngrediant;
export const displayContactMethod = Display.displayContact;
export const displaySearchMethod = Display.displaySearch;
