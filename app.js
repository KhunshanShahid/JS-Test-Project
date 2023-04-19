const API_KEY = '3adc5561c5be4e82bf44f3a670c6714f';
const NUM_RECIPES = 10;


fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${NUM_RECIPES}`)
  .then(x => x.json())
  .then((data) => {
    let myRecipe = JSON.stringify(data.recipes);
    localStorage.setItem("myRecipe", myRecipe)
  })

let RecData = localStorage.getItem('myRecipe')
myRecipeData = JSON.parse(RecData)

let searchBar = document.getElementById('searchItem')
const productContainer = document.querySelector('#product-list');
let myData = []

const productCardsHtml = myRecipeData.map((product, index) => {

  return ` 
<div class="container" onclick="display(${index})">
<div class="card" >
  <div class="card-image">
  <img src="${product.image}"  alt="..." width=50% height=200px>
  </div>
  <div class="card-text">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-body"> ${product.extendedIngredients.map(ingredient => ingredient.name + " ").join('')}</p>
  </div>
</div>
</div>
`
}).join('');
productContainer.innerHTML = productCardsHtml;

// ========= when click on this button we come to home page or all data ===========

document.getElementById("BackDefault").addEventListener(
  "click", function () {
    productContainer.innerHTML = productCardsHtml;
    searchBar.value = ""
    searchBar.style.display = 'block';
  })


// ======== Search Functionality ===========

searchBar.addEventListener('keyup', searchmyRecipeData);

function searchmyRecipeData() {

  const searchTerm = searchBar.value.toLowerCase();
  const filteredmyRecipeData = myRecipeData.filter((product) => {

    const productName = product.title.toLowerCase();
    return productName.includes(searchTerm)

  });


  const productCardsHtml2 = filteredmyRecipeData.map((product, index) => {
    return `
  <div class="container" onclick="display(${index})">
<div class="card" >
  <div class="card-image">
  <img src="${product.image}"  alt="..." width=100% height=300px>
  </div>
  <div class="card-text">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-body"> ${product.extendedIngredients.map(ingredient => ingredient.name + " ").join('')}</p>
  </div>
</div>
</div>

  `
  }).join('');
  productContainer.innerHTML = productCardsHtml2
}

// ====== get specific data of produt and display it===========

function display(y) {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredmyRecipeData = myRecipeData.filter((product) => {
    const productName = product.title.toLowerCase();
    return productName.includes(searchTerm)
  });

  if (searchTerm === "") {
    myData.push(myRecipeData[y])
  }
  else {
    myData.push(filteredmyRecipeData[y])
  }
  const productID = myData.map(x => {
    return `
  <div class="recipe-data-main">
    <div class="my-img">
    <img src="${x.image}" class="recipe-data-img" alt="..." width=400px height=400px>
    </div>
    <div class="recipe-instruction">
    <div class="recipe-title">${x.title}</div>
    <div class="ing-title">Ingredients</div>
    <div class="ingredients">${x.extendedIngredients.map(ingredient => `<li class="IngredientsList">${ingredient.original}</li>`).join('')}</div>
    <div class="Inst-title">Instructions</div>
    <div class="instructions"> <li class="IngredientsList">${x.instructions}</li></div>
    </div>
    </div>
  `
  }).join("")
  productContainer.innerHTML = productID;
  searchBar.style.display = 'none';
  myData.pop()
}