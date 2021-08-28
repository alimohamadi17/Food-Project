
const searchbtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const DetailsContent = document.querySelector('.details-content');
const closebtn = document.getElementById('close');

// event listeners
searchbtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe)
closebtn.addEventListener('click', closebtnfu)

//get meal list that matches with the ingredients
function getMealList() {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class="meal-item" data-id='${meal.idMeal}'>
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h2 class="h2end">${meal.strMeal}</h2>
                    <a href="#" class="recipe-btn"> Get Recip</a>
                </div>

                </div>
                
                `;
                })
                mealList.classList.remove('notfound');
            } else {
                html = "Sorry , We didn't find any meal!"
                mealList.classList.add('notfound')

            }
            mealList.innerHTML = html;
        });
}

// close btn

function closebtnfu() {
    DetailsContent.parentElement.classList.remove('showRecip')
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals))
    }
}

// Modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0]
    html =

        `
    <h2 class="recip-title">${meal.strMeal}</h2>
    <p class="category">${meal.strCategory}</p>
    <div class="instruct">
        <h3>Instructions : </h3>

        <p class='p-content'>${meal.strInstructions}</p>

        <div class="recip-img">
            <img src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="recip-link">
            <a href="${meal.strYoutube}" target="_blank">Watch video</a>
        </div>

    </div>
    
    
    `;
    DetailsContent.innerHTML = html;
    DetailsContent.parentElement.classList.add('showRecip')

}




function Ali() {
    fetch("https://vindecoder.p.rapidapi.com/salvage_check?vin=4T4BF1FKXER340134", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "vindecoder.p.rapidapi.com",
            "x-rapidapi-key": "dff8b0d575mshc8fdb5793fac5b9p16ac8ajsn66d9e228b703"
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
}