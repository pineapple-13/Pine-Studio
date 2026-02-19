const homePage = document.querySelector(".homePage");
const albumsPage = document.querySelector(".albumsPage");
const songsPage = document.querySelector(".songsPage");
const homeLink = document.querySelector(".homeLink");

let currentPage = homePage;

function showPage(pageToShow){
    currentPage.classList.add("hidden");
    pageToShow.classList.remove("hidden");

    currentPage = pageToShow;
}

homeLink.addEventListener('click', () =>{
    showPage(homePage);
})

const music = [
    {
        artistName: "BILLIE EILISH",
        artistImg: "imgs/billieEilish.jpg",
        albums: [
            {
                albumTitle: "HIT ME HARD OR SOFT",
                albumImg: "imgs/billieEilish.jpg",
                songs: [
                    { songTitle: "SKINNY", file: "songs/skinny.mp3" },
                    { songTitle: "LUNCH", file: "songs/lunch.mp3" },
                    { songTitle: "CHIHIRO", file: "songs/chihiro.mp3" },
                    { songTitle: "BIRDS OF A FEATHER", file: "songs/birdsOfAFeather.mp3" },
                    { songTitle: "WILDFLOWER", file: "songs/wildflower.mp3" },
                    { songTitle: "THE GREATEST", file: "songs/theGreatest.mp3" },
                    { songTitle: "L'AMOUR DE MA VIE", file: "songs/lamourDeMaVie.mp3" },
                    { songTitle: "THE DINER", file: "songs/theDiner.mp3" },
                    { songTitle: "BITTERSUITE", file: "songs/bittersuite.mp3" },
                    { songTitle: "BLUE", file: "songs/blue.mp3" }
                ],
            }
        ]
    }
]

const artistsContainer = document.querySelector(".artists");
const albumsContainer = document.querySelector(".albums");
const songsList = document.querySelector(".songs");

let currentArtist = null;
let currentAlbum = null;
let currentSongIndex = 0;
let currentSongsList = [];

function renderArtists(){
    music.forEach((artist, artistIndex) => {

        const artsLink = document.createElement("div");
        artsLink.classList.add("artsLink");
        

        const artsCase = document.createElement("div");
        artsCase.classList.add("artsCase");

        const artsCover = document.createElement("img");
        artsCover.classList.add("artsCover");
        artsCover.src = artist.artistImg;

        artsCase.appendChild(artsCover);


        const artsName = document.createElement("div");
        artsName.classList.add("artsName");

        const actName = document.createElement("h2");
        actName.textContent = artist.artistName;

        artsName.appendChild(actName);


        artsLink.appendChild(artsCase);
        artsLink.appendChild(artsName);

        artsLink.addEventListener('click', () => {
            currentArtist = artistIndex;
            renderAlbums(artistIndex);
            showPage(albumsPage);
        })

        artistsContainer.appendChild(artsLink);

    })
}

function renderAlbums(artistIndex){
    albumsContainer.innerHTML = "";

    const artistName = music[artistIndex].artistName;
    const albumsActHeading =document.querySelector(".albumsActHeading");
    albumsActHeading.textContent = artistName;

    const albums = music[artistIndex].albums;

    albums.forEach((album, albumIndex) =>{
        


        const albumsLink = document.createElement("div");
        albumsLink.classList.add("albumsLink");

        const albumsCase = document.createElement("div");
        albumsCase.classList.add("albumsCase");

        const albumsCover = document.createElement("img");
        albumsCover.classList.add("albumsCover");
        albumsCover.src = album.albumImg;

        albumsCase.appendChild(albumsCover);


        const albumsTitle = document.createElement("div");
        albumsTitle.classList.add("albumsTitle");

        const actTitle = document.createElement("h2");
        actTitle.textContent = album.albumTitle;

        albumsTitle.appendChild(actTitle);


        albumsLink.appendChild(albumsCase);
        albumsLink.appendChild(albumsTitle);

        albumsLink.addEventListener('click', () => {
            currentAlbum = albumIndex;
            showPage(songsPage);
            renderSongs(artistIndex, albumIndex);
        })

        albumsContainer.appendChild(albumsLink);
    })
}

function renderSongs(artistIndex, albumIndex){

    const albumTitle = music[artistIndex].albums[albumIndex].albumTitle;
    const songsActHeading = document.querySelector(".songsActHeading");
    songsActHeading.textContent = albumTitle;

    const songs = music[artistIndex].albums[albumIndex].songs;
    currentSongsList = songs;

    songs.forEach((song, songIndex) =>{
        const songsItem = document.createElement("li");
        songsItem.classList.add("songsItem");

        const songsNumWrap = document.createElement("div");
        songsNumWrap.classList.add("songsNumWrap");

        const songsNum = document.createElement("p");
        songsNum.classList.add("songsNum");
        songsNum.textContent = songIndex + 1;

        songsNumWrap.appendChild(songsNum);


        const songsAudioWrap = document.createElement("div");
        songsAudioWrap.classList.add("songsAudioWrap");

        const songsName = document.createElement("p");
        songsName.classList.add("songsName");
        songsName.textContent = song.songTitle;

        songsAudioWrap.appendChild(songsName);


        songsItem.appendChild(songsNumWrap);
        songsItem.appendChild(songsAudioWrap);

        songsItem.addEventListener('click', () => {
            const audioSec = document.querySelector(".audioSec");
            audioSec.classList.remove("hidden");

            currentSongIndex = songIndex;

            const player = document.querySelector(".player");
            player.src = song.file;
            player.play();

            const shuffle = document.querySelector(".shuffle");
            const previous = document.querySelector(".previous");
            const play = document.querySelector(".play");
            const pause = document.querySelector(".pause");
            const next = document.querySelector(".next");
            const loop = document.querySelector(".loop");
            
            play.addEventListener('click', () => {
                player.pause()
                play.classList.add("hidden");
                pause.classList.remove("hidden");
            });

            pause.addEventListener('click', () => {
                player.play();
                pause.classList.add("hidden");
                play.classList.remove("hidden")
            });

            next.addEventListener('click', () => {
                currentSongIndex++;

                if(currentSongIndex >= currentSongsList.length) {
                    currentSongIndex = 0;
                };

                player.src = currentSongsList[currentSongIndex].file;

                if(!play.classList.contains("hidden")) {
                    player.play();
                };
            })

            previous.addEventListener('click', () => {
                currentSongIndex--;

                if(currentSongIndex < 0) {
                    currentSongIndex = currentSongsList.length - 1;
                };

                player.src = currentSongsList[currentSongIndex].file;

                if(!play.classList.contains("hidden")) {
                    player.play();
                };
            })
        })


        songsList.appendChild(songsItem);
    })
}

renderArtists();







const progressBar = document.querySelector(".progBar");
const audio = document.querySelector(".player");
const audioTime = document.querySelector(".audioTime");

audio.addEventListener("loadedmetadata", () => {
    const duration = audio.duration; // seconds
    audioTime.textContent = formatTime(duration);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}


function updateProgress() {
    const percent =
        (audio.currentTime / audio.duration) * 100;

    progressBar.style.width = percent + "%";

    requestAnimationFrame(updateProgress);
}

// start animation when playing
audio.addEventListener("play", () => {
    requestAnimationFrame(updateProgress);
});

const container = document.querySelector(".progWrap");

container.addEventListener("click", (e) => {
    const width = container.clientWidth;
    const clickX = e.offsetX;

    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

let isDragging = false;

const dot = document.querySelector(".progDot");

dot.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;

    // clamp to container width
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    // calculate percentage
    const percent = offsetX / rect.width;

    // update audio time
    audio.currentTime = percent * audio.duration;

    // update visual bar width
    const progressBar = document.querySelector(".progBar");
    progressBar.style.width = percent * 100 + "%";
});


