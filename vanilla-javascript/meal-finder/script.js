const searchInput = document.querySelector("#search");
const submit = document.querySelector("#submit");
const mealsEl = document.querySelector("#meals");
const result = document.querySelector("#result-heading");
const random = document.querySelector("#random");
const singleMeal = document.querySelector("#single-meal");

submit.addEventListener("submit", (e) => {
  e.preventDefault();

  searchMeal();
  searchInput.value = "";
  singleMeal.innerHTML = "";
});

random.addEventListener("click", () => {
  mealsEl.innerHTML = "";
  result.innerHTML = "";
  randomMeal();
});

mealsEl.addEventListener("click", (e) => {
  if (!e.target.matches(".meal-info")) return;
  const id = e.target.getAttribute("data-mealid");

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      mealsEl.innerHTML = "";
      result.innerHTML = "";
      generateUi(data);
    });
});

function searchMeal() {
  const searchedMeal = searchInput.value.trim();
  result.innerHTML = `<h2>Search results for '${searchedMeal}':`;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;
      mealsEl.innerHTML = "";
      meals.forEach((meal) => {
        const newMeal = document.createElement("div.meal");
        newMeal.innerHTML = `<div class="meal">
              <img src=${meal.strMealThumb} alt="${meal.strMeal}">
              <div class="meal-info" data-mealid=${meal.idMeal}>
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`;
        mealsEl.appendChild(newMeal);
      });
    });
}

function randomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      generateUi(data);
    });
}

function generateUi(data) {
  const meal = data.meals[0];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  singleMeal.innerHTML = `<div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          
        </ul>
      </div>
    </div>`;
}
