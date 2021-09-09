const DOG_API_URL = "https://dog.ceo/api/";
let dogs = [];
function getBreedPictures(categoryId){
    const BREED_ENDPOINT = DOG_API_URL + `breed/${categoryId}/images`;
    
    $.get(BREED_ENDPOINT, function(data, status){
        dogs =[];
        for(const picture of data.message){
            
            dogs.push({
                id: (picture.split("/")[5]).replace(".jpg", "") + categoryId,
                breed: categoryId,
                picture: picture,
                weight: Math.random().toPrecision(1) * 1000,
                price: Math.random().toPrecision(1) * 1000
            })
        }
        let categoryDetail = categoryTemplate(categoryId, dogs)

        $("#cat-content").html(categoryDetail);    
       
    });
}


function cartPageTemplate(){
    let picturesHtml ="";
    let dogs = JSON.parse(localStorage.getItem('cart'));
    dogs.map((dog, index)=>{
        picturesHtml +=  `
        <div class="layout-inline d-flex">
          
          <div class="col col-pro layout-inline">
          <img src=${dog.picture} alt='dog picture'>
            <p>Breed name:${dog.breed} </p>
            <p>Price: GH ${dog.price}</p>
            <p>weight:${dog.weight} </p>
           
          </div>


          </div>   
          `
    })
    picturesHtml += `          
        <div class="w-100">
            <h2>Total : Gh  ${getTotal()}</h2>
        </div>
    
    `
    $("#cat-content").html(picturesHtml);
    
}
function categoryTemplate(breed, dogs){
    let picturesHtml = "";
    dogs.map((dog, index) =>{
        picturesHtml += `
            <article class="card grid-item">
                <img src=${dog.picture} alt='dog picture'>
                <div class="text">
                    <h3>${breed}</h3>
                    <h3>weight : ${dog.weight} pounds</h3>
                    <h3>  price : GH ${dog.price}</h3>
                    <button onclick="addToCart(${index})" class="add-cart">Add to Cart</button>
                    
                </div>
            </article>
        
        `
    })

    return picturesHtml;
}

function addToCart(dogIndex){
    if(localStorage.getItem('cart')){
        let existingItemInCart = JSON.parse(localStorage.getItem('cart'));
        existingItemInCart.push(dogs[dogIndex]);
        existingItemInCart = JSON.stringify(existingItemInCart);
        localStorage.setItem('cart', existingItemInCart);
    }
    else{
        localStorage.setItem('cart', JSON.stringify([dogs[dogIndex]]));
    }
    updateCartUI();
    updateCountCart();

}
function updateCartUI(){
    let dogs = JSON.parse(localStorage.getItem('cart'));
    let cartHtml = "";
    let div1 = document.createElement("div");
    div1.id = "div1";

    for(let dog of dogs){
        
        cartHtml += `
       
     
        <img src=${dog.picture} alt='dog picture'>
        <div class="flex" ><h1>${dog.breed}</h1> <button class="btn btn-remove" type="button" onclick="removeItem('${dog.id}')">x</button></div>
        <p class="price">Price: GHS ${dog.price}</p>
        `
    }
    cartHtml += "<button onclick='cartPageTemplate();'>  Check out</button>";
    div1.innerHTML = cartHtml;
    $('#cart-items-list').html(div1)
}
function getTotal(){ 
    let dogs = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    for(const dog of dogs){
        total += parseFloat(dog.price);
    }
    return total;
}
function removeItem(id){
    let dogs = JSON.parse(localStorage.getItem('cart'));
    dogs = dogs.filter(dog =>dog.id != id);
    localStorage.setItem('cart', JSON.stringify(dogs));
    updateCartUI();
    updateCountCart();
}

 $(document).ready(function(){
    getAllBreeds();
    updateCartUI();
    toggleCartView();
    updateCountCart();
    cartPageTemplate();

    function getAllBreeds(){
        const BREEDS_ENDPOINT = DOG_API_URL + "breeds/list/all";

        $.get(BREEDS_ENDPOINT, function(data, status){
            const breeds = data.message;
            const numberOfBreeds = 3;
            let count = 0;
            let categoryListHtml = "";
            for(const key in breeds){
                if(count < numberOfBreeds && breeds[key][2]){
                    categoryListHtml += `
                    <li onclick="getBreedPictures(this.id);" id=${key}>${key}
                        <ul>
                            <li id=${breeds[key][0]}>${breeds[key][0]}</li>
                            <li${breeds[key][1]}>${breeds[key][1]}</li$>
                            <li${breeds[key][2]}>${breeds[key][2]}</li$>
                        </ul>
                    </li>
                    ` 
                    count += 1;
                } 
            }
            $('#categoryList').html(categoryListHtml);
        });
    }



});

function toggleCartView(){
    var x= document.getElementById("div1");
    if(x.style.display==="none"){
        x.style.display="block";
    }else{
        x.style.display ="none";
    }
   

}
function updateCountCart(){
    let dogs = JSON.parse(localStorage.getItem('cart'));
    let numberOfDogsInCart = dogs.length;
    $("#countCart").text(numberOfDogsInCart);
}
// remove.onclick = function(e){
//     if(e.target && e.target.classList.contains('remove')){
//         const name=e.target.dataset.name
//         removeItem(name) 
// }


