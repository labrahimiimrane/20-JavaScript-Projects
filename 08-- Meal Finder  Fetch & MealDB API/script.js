const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal");

// Search Meal And fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear Single Meal
  singleMealEl.innerHTML = "";

  //Get search term
  const term = search.value;

  // Check for Empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2> Search results for '${term}' : </h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p> There Are No Search Results. Try Again! </p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal"> 
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" /> 
                 <div class="meal-info" data-mealID="${meal.idMeal}">
                 <h3>${meal.strMeal}</h3>
                </div>
            </div>`
            )
            .join("");
        }
      });

    // Clear search text

    search.value = "";
  } else {
    alert("Type Your Search Please");
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
    `)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}

// Ftech Random meal from API
function getRandomMeal() {
  // Clear Mels And Heading

  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}

// Add Meal To Dom
function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = ` 
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>

            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}

            </div>

            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingrediants</h2>

                <ul>
                    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
            </div>
        </div>
  `;
}

//Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    console.log(item);

    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
