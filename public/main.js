const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const menuForSm = document.querySelector(".nav-for-sm");

const homeBody = document.querySelector(".home-body");
const recipeBody = document.getElementById("recipe-body");
const favBody = document.getElementById("fav-body");
const homeBtn = document.querySelectorAll(".home-btn");
const recipeBtn = document.querySelectorAll(".recipe-btn");
const favBtn = document.querySelectorAll(".fav-btn");
const recipeContainer = document.querySelector(".recipe-c");
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

// RECIPE PAGE
// const recipeImg = document.querySelector(".recipe img");
// const recipeName = document.querySelector(".recipe-name");

// Nav event listeners
homeBtn.forEach((btn)=>{
  btn.addEventListener("click", ()=>{
    if(homeBody.classList.contains("hidden")){
      homeBody.classList.remove("hidden");
      recipeBody.classList.add("hidden");
      favBody.classList.add("hidden");
    }
  })
});
recipeBtn.forEach((btn)=>{
  btn.addEventListener("click", ()=>{
    if(recipeBody.classList.contains("hidden")){
      recipeBody.classList.remove("hidden");
      favBody.classList.add("hidden");
      homeBody.classList.add("hidden");
    }
  })
});

favBtn.forEach((btn)=>{
  btn.addEventListener("click", ()=>{
    if(favBody.classList.contains("hidden")){
      favBody.classList.remove("hidden");
      recipeBody.classList.add("hidden");
      homeBody.classList.add("hidden");
    }
  })
});



// Fetch meal by category
const mealsByCategories = async () => {
  let apiSource = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const apiJson = await apiSource.json();

  // console.log(apiJson);

  return apiJson.categories;
};

const displayMeals = (categories) => {
  const mealImg = categories.strCategoryThumb;
  const mealName = categories.strCategory;

  let mealEl = document.createElement("li");

  mealEl.innerHTML = `
  <li class="recipe border border-slate-100 h-64 rounded-xl overflow-hidden cursor-pointer relative">
    <img class="object-cover w-full h-full" src="${mealImg}" alt="${mealName}" loading="lazy">
    <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 py-1.5 px-4 bg-gray-100/60">
        <span class="recipe-name text-black text-lg font-medium">${mealName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="star-btn w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>   
    </div>
</li>
    `;
  recipeContainer.append(mealEl);

  const btn = mealEl.querySelector(".recipe div .star-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("fill-orange-500")) {
      btn.classList.remove("fill-orange-500");
    } else {
      btn.classList.add("fill-orange-500");
    }
  });
};

const displayMealsByCategories = async () => {
  const mealsArray = await mealsByCategories();

  for (const meal of mealsArray) {
   displayMeals(meal);
  }
};

displayMealsByCategories();

// Search meal by name
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

      const btn = mealEl.querySelector(".recipe div .star-btn");

      btn.addEventListener("click", () => {
        if (btn.classList.contains("fill-orange-500")) {
          btn.classList.remove("fill-orange-500");
          removeMealFromLS(meal.idMeal);
        } else {
          btn.classList.add("fill-orange-500");
          addMealToLS(meal.idMeal);
        }
        displayFavMeals()
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
      
      // *****UNFINISHED
      const favBtn = mealEl.querySelector(".recipe div .star-btn")
      favBtn.addEventListener("click", ()=>{
        if(favBtn.classList.contains("fill-orange-500")){
          favBtn.classList.remove("fill-orange-500");
          removeMealFromLS(meal.idMeal);
        }else{
          favBtn.classList.add("fill-orange-500");
          addMealToLS(meal.idMeal)
        }
        fetchMealById(meal.idMeal)
      })
    }
  }
  
};

displayFavMeals();
