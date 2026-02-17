const homePage = document.querySelector(".homePage");
const albumsPage = document.querySelector(".albumsPage");
const songsPage = document.querySelector(".songsPage");

let currentPage = homePage;

function showPage(pageToShow){
    currentPage.classList.add("hidden");
    pageToShow.classList.remove("hidden");

    currentPage = pageToShow;
}

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
                    { songTitle: "CHIHIRO", file: "songs/skinny.mp3" },
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
            const player = document.querySelector(".player");
            player.src = song.file;
            player.play();
        })

        songsList.appendChild(songsItem);
    })
}

renderArtists();