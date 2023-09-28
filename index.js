const link = "http://127.0.0.1:3000/GameList"
fetch(link)
.then(response => response.json())
.then(games => {
    games.forEach(game => {
        displayImages(game);
    });
    displayInfo(games[0]);
});

function displayImages(game)
{
    const image = document.createElement("img");
    image.setAttribute("id","gameicon");
    image.src = game.image;

    //setting default height and width
    image.style.height = "64px"
    image.style.width = "64px"

    //different events attached to all the icons
    image.addEventListener("click", () => {
        document.querySelector("#game-info").style.visibility = "visible";
        displayInfo(game);
    });
    image.addEventListener("mouseover", () => {
        image.setAttribute("id","mouseover");
        image.style.height = "128px"
        image.style.width = "128px"
    })
    image.addEventListener("mouseout", () => {
        image.setAttribute("id","gameIcon");
        image.style.height = "64px"
        image.style.width = "64px"
    })
    document.querySelector("#icons").append(image);
}
//function to display the info for each game
function displayInfo(game)
{   
    const imageinfo = document.querySelector("#gameImage");
    imageinfo.src = game.image;
    imageinfo.style.height = "256x";
    imageinfo.style.width = "256px";
    document.querySelector("#title").textContent = game.name;
    document.querySelector("#description").textContent = game.description;
}
//creating a submit form for new games and adding them to an object
document.querySelector("#form").addEventListener("submit", submitForm)
function submitForm(e)
{
    e.preventDefault();
    let gameObj ={
        name : e.target["new-name"].value,
        description : e.target["new-description"].value,
        image : e.target["new-image"].value
    }
    console.log(JSON.stringify(gameObj));
    addGame(gameObj);
}

//adds gameinfo from the form above to db.json file
function addGame(gameObj)
{
    fetch(link,{
        method: `POST`,
        headers: {
            "Content-type":"application/json"
        },
        body:JSON.stringify(gameObj)
    })
}


// document.querySelector("#update-info").addEventListener("submit", e => {
//     e.preventDefault();
//     let updateObj = {
//         name: e.target["edit-name"].value,
//         description: e.target["edit-description"].value,
//         image: e.target["edit-image"].value
//     }
// })