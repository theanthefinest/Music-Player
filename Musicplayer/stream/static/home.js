const player = document.querySelector('audio')
const play = document.getElementById('play')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const audio_tracks = document.querySelectorAll('.play-button')
const song_title = document.querySelector('.song-title')
const artist = document.querySelector('.artist')
const music_img = document.querySelector('.music_img')
const main_div = document.querySelector(".main_div");
const progress = document.querySelector(".progress");
const curr_time = document.querySelector("#current_time");
const dur_time = document.querySelector("#duration");
const progress_div = document.querySelector('.progress_div');


// initilize music indexing
let musicIndex = 0

//get music document from backend 
const musics = JSON.parse(document.getElementById('musics').textContent)

// loading a set detail of music in UI
const setSRC = () => {

    player.src = `/media/${musics[musicIndex].audio_file}`
    song_title.textContent = musics[musicIndex].title
    artist.textContent = musics[musicIndex].artist
    music_img.setAttribute('src', `media/${musics[musicIndex].cover_image}`)

}

//determine player should play or not 
const playOrPause = () => {
    if (player.paused) {
        player.play()
        changingTheIcons(musicIndex, play, 'play');
    }
    else {
        player.pause()
        changingTheIcons(musicIndex, play, 'pause');
    }
}

const changingTheIcons = (Index, play, playOrpause, next = 0) => {
    const element = document.getElementById(Index);
    const title = document.getElementById(`title${Index}`);
    const artist = document.getElementById(`artist${Index}`);
    if (playOrpause == 'play') {
        play.classList.replace('fa-play', 'fa-pause');
        element.classList.replace('fa-play', 'fa-pause');
        element.style.color = '#fd3123'
        title.style.color = '#fd3123'
        artist.style.color = '#f44336'
    }
    else {
        play.classList.replace('fa-pause', 'fa-play');
        element.classList.replace('fa-pause', 'fa-play');
    }
    if (next == 1) {
        element.style.color = '#fff';
        title.style.color = '#fff'
        artist.style.color = '#fff'
    }
};

// when an audio is chosen from the song tracks
const getsong = (btn) => {
    // console.log(btn.id);
    const newIndex = parseInt(btn.id);

    changingTheIcons(musicIndex, play, 'pause', 1);
    changingTheIcons(newIndex, play, 'play');

    if (newIndex == musicIndex) {
        if (player.paused) {
            player.play()
            changingTheIcons(musicIndex, play, 'play');
        } else {
            player.pause()
            changingTheIcons(musicIndex, play, 'pause');
        }
    } else {
        musicIndex = newIndex
        setSRC()
        player.play()
        play.classList.replace('fa-play', 'fa-pause');
    }
};

// eventlisteners
// when play btn is clicked
play.addEventListener("click", e => {
    playOrPause()
})


// when the prev btn is clicked
prev.addEventListener('click', () => {
    changingTheIcons(musicIndex, play, 'pause', 1);
    musicIndex = musicIndex - 1
    if (musicIndex < 0) {
        musicIndex = musics.length - 1
    }
    changingTheIcons(musicIndex, play, 'play');
    setSRC()
    playOrPause()
})

// when the next btn is clicked
next.addEventListener('click', () => {
    changingTheIcons(musicIndex, play, 'pause', 1);
    musicIndex = musicIndex + 1
    if (musicIndex > musics.length - 1) {
        musicIndex = 0
    }
    changingTheIcons(musicIndex, play, 'play');
    setSRC()
    playOrPause()

})

// when the music has ended
player.addEventListener("ended", () => {
    next.click()
});


// load first music
setSRC();
play.click();
play.click();
changingTheIcons(0, play, 'pause');


// Progress Bar for a particular song
player.addEventListener('timeupdate', (event) => {
    // console.log(event);
    let { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    let r1 = Math.floor(duration / 60);
    let r2 = Math.floor(duration % 60);

    let l1 = Math.floor(currentTime / 60);
    let l2 = Math.floor(currentTime % 60);

    if (duration) {
        if (l2 < 10)
            l2 = '0' + l2;
        if (r2 < 10)
            r2 = '0' + r2;
        curr_time.innerText = l1 + ":" + l2;
        dur_time.innerText = r1 + ":" + r2;
    }

});

progress_div.addEventListener('click', (event) => {

    let move_progress = ((event.offsetX) / (progress_div.clientWidth)) * player.duration;
    player.currentTime = move_progress;
});


// Keyboard Shortcuts
document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 32) {
        playOrPause();
    }
    if (event.keyCode === 176) {
        next.click();
    }
    if (event.keyCode === 177) {
        prev.click();
    }
});

// ...existing code for selecting elements...

// Add new element selectors
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume-icon');
const shuffleBtn = document.querySelector('.shuffle');
const repeatBtn = document.querySelector('.repeat');
const favoriteBtn = document.querySelector('.favorite-btn');

// Add state variables
let isShuffling = false;
let isRepeating = false;
let previousVolume = 0.5; // Store volume for mute/unmute

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    player.volume = volume;
    updateVolumeIcon(volume);
});

volumeIcon.addEventListener('click', () => {
    if (player.volume > 0) {
        previousVolume = player.volume;
        player.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        player.volume = previousVolume;
        volumeSlider.value = previousVolume * 100;
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
});

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else if (volume < 0.5) {
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-down');
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-down');
    } else {
        volumeIcon.classList.replace('fa-volume-down', 'fa-volume-up');
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
}

// Shuffle functionality
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active');
});

// Repeat functionality
repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active');
    player.loop = isRepeating;
});

// Modify the next button click handler to support shuffle
next.addEventListener('click', () => {
    changingTheIcons(musicIndex, play, 'pause', 1);
    
    if (isShuffling) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * musics.length);
        } while (newIndex === musicIndex && musics.length > 1);
        musicIndex = newIndex;
    } else {
        musicIndex = (musicIndex + 1) % musics.length;
    }
    
    changingTheIcons(musicIndex, play, 'play');
    setSRC();
    playOrPause();
});

// Favorites functionality
function addToFavorites(id) {
    const btn = document.querySelector(`[data-id="${id}"] .fa-heart`);
    btn.classList.toggle('active');
    
    // Here you can add API call to backend to save favorite status
    fetch(`/api/favorites/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            btn.classList.toggle('active'); // Revert if failed
        }
    });
}

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Add more keyboard shortcuts
document.addEventListener("keyup", function(event) {
    // ...existing keyboard shortcuts...
    if (event.keyCode === 77) { // 'M' key for mute/unmute
        volumeIcon.click();
    }
    if (event.keyCode === 82) { // 'R' key for repeat
        repeatBtn.click();
    }
    if (event.keyCode === 83) { // 'S' key for shuffle
        shuffleBtn.click();
    }
});

// Initialize volume
player.volume = volumeSlider.value / 100;
updateVolumeIcon(player.volume);