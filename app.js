let mainPage = document.querySelector("#main-page");
let breedPage = document.querySelector("#breed-page");
let subBreedPage = document.querySelector("#sub-breed-page");
let currentPage = "mainPage";
let ulImages = "";
let breedName = "";
let subBreedName = "";


function displayAllBreeds() {
    currentPage = "mainPage";
    displayMainRandomImage();
    activiteSection(mainPage);
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getAllList);
    oReq.open("GET", "https://dog.ceo/api/breeds/list/all");
    oReq.send();
}

displayAllBreeds();
function getAllList() {
    let allListMessage = JSON.parse(this.responseText).message;
    document.querySelector("#allBreedList").innerHTML="";
    for (let allBreed in allListMessage) {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        aElement.setAttribute("href", "#");
        aElement.setAttribute("onClick", "displayBreedPage(this, event)");
        aElement.textContent = uppCase(allBreed);
        liElement.appendChild(aElement);
        document.querySelector("#allBreedList").appendChild(liElement);  
    }  
}
function displayBreedPage(element, event)  {
    if ( event != null){
        event.preventDefault();    
    }
    currentPage = "breedPage";
    activiteSection(breedPage);
    if (element != null) {
        breedName = element.textContent.toLowerCase();
    }
    window.location.hash = breedName;
    displayBreeds(breedName);
    ulImages = "#allBreedImages";
    displayBreedImages(breedName);
    displayBreedRandomImage();
    
}

function displayBreeds(breedName) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getSubBreeds);
    oReq.open("GET", "https://dog.ceo/api/breed/" + breedName + "/list");
    oReq.send();
}
function getSubBreeds() {
    let subBreedsMessage = JSON.parse(this.responseText).message;
    document.querySelector("#subBreedList").innerHTML = "";
    for (let i = 0; i < subBreedsMessage.length; i++) {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        aElement.setAttribute("href", "#");
        aElement.setAttribute("onClick", "displaySubBreedPage(this,event)");
        aElement.textContent =  uppCase(subBreedsMessage[i]);
        liElement.appendChild(aElement);
        document.querySelector("#subBreedList").appendChild(liElement);
    }
}
function displayBreedImages(breedName) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getBreedImages);
    oReq.open("GET", "https://dog.ceo/api/breed/" + breedName + "/images");
    oReq.send();
}

function getBreedImages() {
    let subBreedsImagesMessage = JSON.parse(this.responseText).message;
    document.querySelector(ulImages).innerHTML = "";
    for (let i = 0; i < (subBreedsImagesMessage.length < 50 ? subBreedsImagesMessage.length : 50); i++) {
        let liElement = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src", subBreedsImagesMessage[i]);
        liElement.appendChild(img);
        document.querySelector(ulImages).appendChild(liElement);
    }
}

function displaySubBreedPage(element,event) {
    event.preventDefault();    
    currentPage = "subBreedPage";
    activiteSection(subBreedPage);
    subBreedName = element.textContent.toLowerCase();
    window.location.hash += "/" + subBreedName;
    ulImages = "#allSubBreedImages";
    displaySubBreedImages();
    displaySubBreedRandomImage();
    return false;
}

function displaySubBreedImages() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getBreedImages);
    oReq.open("GET", "https://dog.ceo/api/breed/" + breedName + "/" + subBreedName + "/images");
    oReq.send();
}


function displayMainRandomImage() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getMainRandomImage);
    oReq.open("GET", "https://dog.ceo/api/breeds/image/random");
    oReq.send();
}

function getMainRandomImage() {
    let randomImage = JSON.parse(this.responseText).message;
    let liElement = document.createElement("li");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let br = document.createElement("br");
    span.textContent = getDogName(randomImage);
    img.setAttribute("src", randomImage);
    img.setAttribute("title", getDogName(randomImage));
    liElement.appendChild(span);
    liElement.appendChild(br);
    liElement.appendChild(img);
    document.querySelector("#randomArea").innerHTML = "";
    document.querySelector("#randomArea").appendChild(liElement);
}
function getDogName(imageUrl) {
    let arr = imageUrl.split("/");
    return uppCase(arr[4]);
}

function updateMainImage() {
    displayMainRandomImage();
};

function activiteSection(activPage) {
    mainPage.style.display = "none";
    breedPage.style.display = "none";
    subBreedPage.style.display = "none";
    activPage.style.display = "flex";
}


function displayBreedRandomImage() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getBreedRandomImage);
    oReq.open("GET", "https://dog.ceo/api/breed/" + breedName + "/images/random");
    oReq.send();
}


function getBreedRandomImage() {
    let randomBreedImages = JSON.parse(this.responseText).message;
    let liElement = document.createElement("li");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let br = document.createElement("br");
    span.textContent = getBreedDogName(randomBreedImages);
    img.setAttribute("src", randomBreedImages);
    img.setAttribute("title", getBreedDogName(randomBreedImages));
    liElement.appendChild(span);
    liElement.appendChild(br);
    liElement.appendChild(img);
    document.querySelector("#randomBreedArea").innerHTML = "";
    document.querySelector("#randomBreedArea").appendChild(liElement);
}
function getBreedDogName(imageUrl) {
    let arr = imageUrl.split("/");
    return uppCase(arr[4]);
}
function updateBreedImage() {
    displayBreedRandomImage();
};


function displaySubBreedRandomImage() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", getSuBreedRandomImage);
    oReq.open("GET", "https://dog.ceo/api/breed/" + breedName + "/" + subBreedName + "/images/random");
    oReq.send();
}
function getSuBreedRandomImage() {
    let randomSubBreedImages = JSON.parse(this.responseText).message;
    let liElement = document.createElement("li");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let br = document.createElement("br");
    span.textContent = getSubBreedDogName(randomSubBreedImages);
    img.setAttribute("src", randomSubBreedImages);
    img.setAttribute("title", getSubBreedDogName(randomSubBreedImages));
    liElement.appendChild(span);
    liElement.appendChild(br);
    liElement.appendChild(img);
    document.querySelector("#randomSubBreedArea").innerHTML = "";
    document.querySelector("#randomSubBreedArea").appendChild(liElement);
}
function getSubBreedDogName(imageUrl) {
    let arr = imageUrl.split("/");
    return uppCase(arr[4]);
}
function goBack() {
    if (currentPage === "subBreedPage") {
        displayBreedPage(null, null);
    } else if (currentPage === "breedPage") {
        displayAllBreeds();
    }
}

function uppCase(breedUppCase){
    let uppCaseChar = breedUppCase.charAt(0).toUpperCase() + breedUppCase.slice(1);;
    return uppCaseChar;
}