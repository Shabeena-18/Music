
let inputValue = document.getElementById("inputValue");
let container = document.getElementById("container");
let searchButton = document.getElementById("searchBtn");

let searchValue = "";

// STEP 1: Create music card
function createMusicCard(each) {

    let musicItem = document.createElement("div");
    musicItem.classList.add("music-card");
    container.appendChild(musicItem);

    // Song image
    let songImageTag = document.createElement("img");
    songImageTag.classList.add("song-image");
    songImageTag.src = each.album.cover_medium;
    musicItem.appendChild(songImageTag);

    // Song title
    let songTitleTag = document.createElement("h1");
    songTitleTag.classList.add("song-title");
    songTitleTag.textContent = each.title;
    musicItem.appendChild(songTitleTag);

    // Artist name
    let songTextTag = document.createElement("p");
    songTextTag.classList.add("song-text");
    songTextTag.textContent = each.artist.name;
    musicItem.appendChild(songTextTag);

    // Audio player
    let audioTag = document.createElement("audio");
    audioTag.controls = true;
    audioTag.classList.add("audio-tag-styling");

    let source = document.createElement("source");
    source.src = each.preview;

    audioTag.appendChild(source);
    musicItem.appendChild(audioTag);
}


// STEP 2: Display all search results
function displayResults(songs) {

    console.log("Display results function called");

    // Remove previous search results
    container.replaceChildren();

    for (let each of songs) {

        console.log(each);

        createMusicCard(each);
    }
}


// STEP 3: Fetch songs from Deezer API
function getSongs() {

    let query = searchValue;

    const url = "https://proxy.cors.dev/https://api.deezer.com/search?q="
        + encodeURIComponent(query) + "&limit=50";

    console.log(url);

    let options = {
        method: "GET"
    };
    
    spinner.style.display = "block";
    
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data);

            let songs = data.data;
            spinner.style.display = "none";
            displayResults(songs);

        })
        .catch(function(error) {
            console.log("Error:", error);
        });
        
}


// STEP 4: Get input value and search
function searchMusic() {

    console.log("Search function called");

    searchValue = inputValue.value.trim();

    console.log("Search value:", searchValue);

    if (searchValue === "") {
        alert("Please enter a song name");
        return;
    }

    getSongs();

    // Clear input after searching
    inputValue.value = "";
}


// STEP 5: Handle Enter key
function searchElement(event) {

    console.log("Key pressed:", event.key);

    if (event.key === "Enter") {

        searchMusic();

    }
}


// STEP 6: Add event listeners

searchButton.addEventListener("click", searchMusic);

inputValue.addEventListener("keydown", searchElement);

let spinner = document.getElementById("spinner");

spinner.style.display = "block";