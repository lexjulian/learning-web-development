const play = document.querySelector("#play");
const audio = document.querySelector("#audio");
const musicContainer = document.querySelector("#music-container");
const title = document.querySelector("#title");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const cover = document.querySelector("#cover");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");

const songs = ["hey", "summer", "ukulele"];
let songIndex = 2;

function songPlaying(index) {
  audio.src = `music/${songs[index]}.mp3`;
}

function toggleAudioStatus() {
  if (audio.paused) {
    showMusicContainer(audio.paused);
    audio.play();
    play.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    showMusicContainer(audio.paused);
    audio.pause();
    play.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function showMusicContainer(bool) {
  if (bool) {
    musicContainer.classList.add("play");
    title.innerHTML = `${songs[songIndex]}`;
  } else {
    musicContainer.classList.remove("play");
  }
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songPlaying(0);
    songIndex = 0;
  } else {
    songPlaying(songIndex);
  }
  audio.play();
  showMusicContainer(true);
  changeCover(songIndex);
}

function prevSong() {
  if (songIndex === 0) {
    songPlaying(songs.length - 1);
    songIndex = songs.length - 1;
  } else {
    songPlaying(songIndex);
    songIndex--;
  }
  audio.play();
  showMusicContainer(true);
  changeCover(songIndex);
}

function changeCover(songIndex) {
  cover.src = `images/${songs[songIndex]}.jpg`;
}

function progressBar() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const progressContainerWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const progressPercent = (clickX / progressContainerWidth) * 100;
  audio.currentTime = (progressPercent / 100) * audio.duration;
}

play.addEventListener("click", toggleAudioStatus);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", progressBar);
progressContainer.addEventListener("click", setProgress);

songPlaying(2);
