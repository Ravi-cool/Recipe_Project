

// const searchBtn = document.querySelector('.searchbtn');
// const searchbox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "Fetching Recipes...";
//     try {
//         const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const response = await data.json();

//         recipeContainer.innerHTML = "";

//         response.meals.forEach((meal) => {
//             const recipeDiv = document.createElement('div');
//             recipeDiv.classList.add('recipe');
//             recipeDiv.innerHTML = `
//                 <img src="${meal.strMealThumb}">
//                 <h2>${meal.strMeal}</h2>
//                 <p><span>${meal.strArea}</span> Dish</p>
//                 <p>Belongs to <span>${meal.strCategory}</span> Category</p>
//             `;

//             const button = document.createElement('button');
//             button.textContent = "View Recipe";
//             button.addEventListener('click', () => {
//                 openRecipePopup(meal);
//             });

//             recipeDiv.appendChild(button);
//             recipeContainer.appendChild(recipeDiv);
//         });
//     } catch (error) {
//         console.error('Error fetching recipes:', error);
//     }
// };

// const fetchIngredients = (meal) => {
//     let ingredientsList = "";
//     for (let i = 1; i <= 20; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         if (ingredient) {
//             const measure = meal[`strMeasure${i}`];
//             ingredientsList += `<li>${measure} ${ingredient}</li>`;
//         } else {
//             break;
//         }
//     }
//     return ingredientsList;
// };

// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <h3>Ingredients :</h3>
//         <ol class="ingredientList">${fetchIngredients(meal)}</ol>
//         <div class="recipeInstructions">
//             <h3>Instruction:</h3>
//             <p id="instructionPtag">${meal.strInstructions}<p>
//         <div>

        
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.style.display = "none";
// })

// searchBtn.addEventListener('click', () => {
//     const searchInput = searchbox.value.trim();

//     if (!searchInput) {
//         recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
//         return; // Exit the function if searchInput is empty
//     }

//     fetchRecipes(searchInput);
// });

const searchBtn = document.querySelector('.searchbtn');
const searchbox = document.querySelector('.searchbox');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes...";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        if (response.meals === null) {
            // Display an error message if no results are found
            recipeContainer.innerHTML = `<h2>No results found. Please try another search.</h2>`;
            return;
        }

        response.meals.forEach((meal) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h2>${meal.strMeal}</h2>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        // Display an error message if there's an issue with the API request
        recipeContainer.innerHTML = `<h2>Error fetching recipes. Please try again later.</h2>`;
    }
};

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients :</h3>
        <ol class="ingredientList">${fetchIngredients(meal)}</ol>
        <div class="recipeInstructions">
            <h3>Instruction:</h3>
            <p id="instructionPtag">${meal.strInstructions}<p>
        <div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', () => {
    const searchInput = searchbox.value.trim();

    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }

    fetchRecipes(searchInput);
});
