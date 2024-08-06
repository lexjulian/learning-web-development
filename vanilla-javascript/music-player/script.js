const audio = document.querySelector("#audio");
const play = document.querySelector("#play");
const musicContainer = document.querySelector("#music-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");

const songs = ["hey", "summer", "ukulele"];
let songIndex = 2;

playingSong(2);

function playingSong(songIndex) {
  audio.src = `music/${songs[songIndex]}.mp3`;
}

function toggleVideoStatus() {
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
    title.innerText = songs[songIndex];
  } else {
    musicContainer.classList.remove("play");
  }
}

function changeCover() {
  cover.src = `images/${songs[songIndex]}.jpg`;
}

function nextSong() {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  playSong();
}

function prevSong() {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  playSong();
}

function playSong() {
  changeCover();
  playingSong(songIndex);
  showMusicContainer(true);
  audio.play();
}

function progressBar() {
  const progressBarPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressBarPercent}%`;
  if (progressBarPercent === 100) {
    nextSong();
  }
}

function setProgressBar(e) {
  const progressContainerWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const progressPercent = (clickX / progressContainerWidth) * 100;
  audio.currentTime = (progressPercent / 100) * audio.duration;
}

play.addEventListener("click", toggleVideoStatus);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", progressBar);
progressContainer.addEventListener("click", setProgressBar);
