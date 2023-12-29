const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const menuForSm = document.querySelector(".nav-for-sm");

const homePage = document.querySelector(".home-body");
const recipeBody = document.getElementById("recipe-body");
const recipeContainer = document.querySelector(".recipe-c");
const favBody = document.getElementById("fav-body");
const homeBtn = document.querySelectorAll(".home-btn");
const recipeBtn = document.querySelectorAll(".recipe-btn");
const favBtn = document.querySelectorAll(".fav-btn");
const favContainer = document.getElementById("favourites-container");

// Nav/Menus
openMenuBtn.addEventListener("click", () => {
  openMenuBtn.classList.remove("max-sm:block");
  closeMenuBtn.classList.remove("hidden");
  menuForSm.classList.remove("hidden");
  console.log("Tony");
});
closeMenuBtn.addEventListener("click", () => {
  openMenuBtn.classList.add("max-sm:block");
  closeMenuBtn.classList.add("hidden");
  menuForSm.classList.add("hidden");
});

// Nav event listeners
homeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (homePage.classList.contains("hidden")) {
      homePage.classList.remove("hidden");
      recipeBody.classList.add("hidden");
      favBody.classList.add("hidden");

      homeBtn.forEach((b) => {
        b.classList.replace("text-slate-500", "text-orange-500");
      });

      recipeBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });

      favBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });
    }
  });
});

recipeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (recipeBody.classList.contains("hidden")) {
      recipeBody.classList.remove("hidden");
      favBody.classList.add("hidden");
      homePage.classList.add("hidden");

      recipeBtn.forEach((b) => {
        b.classList.replace("text-slate-500", "text-orange-500");
      });
      homeBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });
      favBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });
    }
  });
});

favBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (favBody.classList.contains("hidden")) {
      favBody.classList.remove("hidden");
      recipeBody.classList.add("hidden");
      homePage.classList.add("hidden");

      favBtn.forEach((b) => {
        b.classList.replace("text-slate-500", "text-orange-500");
      });

      homeBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });

      recipeBtn.forEach((b) => {
        b.classList.replace("text-orange-500", "text-slate-500");
      });
    }
  });
});

// Fetch Meal by Category.***************
const mealsByCategories = async () => {
  let apiSource = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const apiJson = await apiSource.json();

  console.log(apiJson.categories);

  return apiJson.categories;
};

const displayMeals = async () => {
  const mealsArray = await mealsByCategories();

  for (const meal of mealsArray) {
    let mealEl = document.createElement("li");

    mealEl.innerHTML = `
    <li class="recipe border border-slate-200 h-64 rounded-xl overflow-hidden cursor-pointer relative group">
      <img class="object-cover w-full h-full group-hover:scale-110 transition duration-300" src="${meal.strCategoryThumb}" alt="${meal.strCategory}" loading="lazy">
      <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
          <span class="recipe-name text-black text-lg font-medium">${meal.strCategory}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>   
      </div>
  </li>
      `;
    recipeContainer.append(mealEl);

    showDescription(
      mealEl,
      meal.strCategory,
      meal.strCategoryThumb,
      meal.strCategoryDescription,
      meal
    );

    const btn = mealEl.querySelector(".recipe div .star-btn");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.classList.contains("fill-orange-500")) {
        btn.classList.remove("fill-orange-500");
      } else {
        btn.classList.add("fill-orange-500");
      }
    });
  }
};
displayMeals();

// Search Meal by Name****************
const searchMealByName = async (name) => {
  const fetchMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const mealsJson = await fetchMeals.json();
  console.log(mealsJson);
  const mealArray = mealsJson.meals;

  if (mealArray) {
    recipeContainer.innerHTML = "";

    for (const meal of mealArray) {
      const mealEl = document.createElement("div");
      mealEl.innerHTML = `
      <li class="recipe border w-full h-64 rounded-xl overflow-hidden relative cursor-pointer">
        <img class="object-cover w-full" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
      <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
          <span class="recipe-name text-black text-lg font-medium">${meal.strMeal}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>   
      </div>
  </li>
      `;
      recipeContainer.append(mealEl);

      showDescription(
        mealEl,
        meal.strMeal,
        meal.strMealThumb,
        meal.strInstructions,
        meal
      );

      const btn = mealEl.querySelector(".recipe div .star-btn");

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (btn.classList.contains("fill-orange-500")) {
          btn.classList.remove("fill-orange-500");
          removeMealFromLS(meal.idMeal);
        } else {
          btn.classList.add("fill-orange-500");
          addMealToLS(meal.idMeal);
        }
        displayFavMeals();
      });
    }
  } else {
    recipeContainer.innerHTML = "<p>Not found</p>";
  }
};

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.trim();

  if (searchInput !== "") {
    searchMealByName(searchInput);
  }
});

// Add to LS
const addMealToLS = (mealId) => {
  const getMeals = getMealFromLS() || [];

  const existingInLS = getMeals.find((meal) => meal.mealId === mealId);

  if (!existingInLS) {
    getMeals.push(mealId);
    localStorage.setItem("mealId", JSON.stringify(getMeals));
  }
};

// Get from LS
const getMealFromLS = () => {
  const mealIds = JSON.parse(localStorage.getItem("mealId"));
  return mealIds === null ? [] : mealIds;
};

// Remove from LS
const removeMealFromLS = (mealId) => {
  const getMeals = getMealFromLS() || [];
  const existingInLS = getMeals.filter((meal) => meal !== mealId);

  localStorage.setItem("mealId", JSON.stringify(existingInLS));
};

const fetchMealById = async (id) => {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${id}`
  );
  const respJson = await resp.json();
  const meals = respJson.meals[0];
  return meals;
};

// Display favourite meals
const displayFavMeals = async () => {
  favContainer.innerHTML = "";

  const getFromLS = getMealFromLS() || [];

  for (const mealId of getFromLS) {
    const meal = await fetchMealById(mealId);
    if (meal) {
      const mealEl = document.createElement("div");

      mealEl.innerHTML = `
  <li class="recipe h-64 rounded-xl overflow-hidden relative cursor-pointer">
    <img class="object-cover w-full" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
    <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
      <span class="recipe-name text-black text-lg font-medium">${meal.strMeal}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 fill-orange-500 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>   
    </div>
  </li>
  `;
      favContainer.append(mealEl);
      showDescription(
        mealEl,
        meal.strMeal,
        meal.strMealThumb,
        meal.strInstructions,
        meal
      );
      const favBtn = mealEl.querySelector(".recipe div .star-btn");
      favBtn.addEventListener("click", () => {
        favContainer.innerHTML = "";
        if (favBtn.classList.contains("fill-orange-500")) {
          favBtn.classList.remove("fill-orange-500");
          removeMealFromLS(meal.idMeal);
        } else {
          favBtn.classList.add("fill-orange-500");
          addMealToLS(meal.idMeal);
        }
        displayFavMeals();
      });
    }
  }
};

displayFavMeals();

// Meal Descriptions******************
const showDescription = (mealEl, mealName, mealImg, instructions, meal) => {
  const descriptionContainer = document.getElementById("description-container");

  mealEl.addEventListener("click", () => {
    descriptionContainer.innerHTML = "";
    descriptionContainer.classList.remove("hidden");
    descriptionContainer.classList.add("flex");

    const ingredients = [];
    console.log(ingredients);

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients.push(
          `${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`
        );
      }
    }

    const sectionEl = document.createElement("section");
    sectionEl.className =
      "mt-16 pt-10 px-4 py-4 w-full max-w-lg flex flex-col items-center rounded-lg bg-white relative overflow-y-auto";

    sectionEl.innerHTML = `
    <button class="close-btn absolute top-3 right-3 hover:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>              
        <h3 class="text-2xl font-medium">${mealName}</h3>
        <img class="mt-6" src="${mealImg}" alt="${mealName}">
        <h4 class="mt-5 font-medium text-xl">Ingredients</h4>
        <ul class="list-disc">
            ${ingredients.map((ingre) => `<li>${ingre}</li>`).join("")}
        </ul>
        <h5 class="mt-4 font-medium text-xl">Descriptions/Instructions</h5>
        <p>${instructions}</p>
    `;
    descriptionContainer.append(sectionEl);
    const closeBtn = sectionEl.querySelector(".close-btn");

    closeBtn.addEventListener("click", () => {
      descriptionContainer.classList.add("hidden");
      descriptionContainer.innerHTML = "";
    });
  });
};
