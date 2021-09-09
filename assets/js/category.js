$(document).ready(function(){
    const DOG_API_URL = "https://dog.ceo/api/";

    getBreed();
    function getBreed(){
        const BREED_ENDPOINT = DOG_API_URL + `breed/list/images`;

        $.get(BREEDS_ENDPOINT, function(data, status){
            const breeds = data.message;
            const numberOfBreeds = 3;
            let count = 0;
            let categoryListHtml = "";
            for(const key in breeds){
                if(count < numberOfBreeds && breeds[key][2]){
                    categoryListHtml += `
                    <li>${key}
                        <ul>
                            <li>${breeds[key][0]}</li>
                            <li>${breeds[key][1]}</li>
                            <li>${breeds[key][2]}</li>
                        </ul>
                    </li>
                    ` 
                    count += 1;
                } 
            }
            $('#categoryList').html(categoryListHtml);
        });
    }

    function categoryTemplate(categoryName, pictures){
        const picturesHtml = "";
        for(const picture of pictures){
            picturesHtml += `
                <article>
                    <img src=${picture} alt='dog picture'>
                    <div class="text">
                        <h3>${categoryName}</h3>
                        <h3>weight : 150 pounds</h3>
                        
                        <button>Buy</button>
                    </div>
                </article>
            
            `
        }
        return `
        <main class="grid">
            ${picturesHtml}
        </main>
        `
    }
    
})
