document.addEventListener("DOMContentLoaded", function () {
  let progress = document.getElementById("progress")
  let song = document.getElementById("song")
  let ContrlIcn = document.getElementById("cntrl")
  let timeDisplay = document.getElementById("timeDisplayLeft")
  let timeDisplay2 = document.getElementById("timeDisplayRight")

  song.onloadedmetadata = function () {
    if (progress) {
      progress.max = song.duration
      progress.value = song.currentTime
      if (timeDisplay) {
        timeDisplay.textContent = formatTime(song.currentTime)
      }
    }
  }

  const playMusic = () => {
    song.play()
    ContrlIcn.classList.replace("fa-play", "fa-pause")
  }

  const pauseMusic = () => {
    song.pause()
    ContrlIcn.classList.replace("fa-pause", "fa-play")
  }

  ContrlIcn.addEventListener("click", () => {
    if (song.paused) {
      playMusic()
    } else {
      pauseMusic()
    }
  })

  function togglePlayPause() {
    if (song.paused) {
      playMusic()
      // document.querySelector(".play_pause").src = ""
    } else {
      pauseMusic()
      // document.querySelector(".play_pause").src = "pause-svgrepo-com.svg"
    }
  }

  if (song.play) {
    setInterval(() => {
      progress.value = song.currentTime
      updateProgressBarColor()
    }, 500)
  }
  function updateProgressBarColor() {
    const progressPercentage = (song.currentTime / song.duration) * 100
    const hue = 120 + progressPercentage * 1.2
    const color = `hsl(${hue}, 100%, 50%)`
    progress.style.background = `linear-gradient(to right, ${color} ${progressPercentage}%, rgb(114, 115, 114) ${progressPercentage}%, rgb(114, 115, 114) 100%)`
  }

  progress.oninput = function () {
    song.currentTime = progress.value
    timeDisplay.textContent = formatTime(song.currentTime)
    ContrlIcn.classList.add("fa-pause")
    ContrlIcn.classList.remove("fa-play")
  }

  song.addEventListener("timeupdate", () => {
    timeDisplay.textContent = formatTime(song.currentTime)
    timeDisplay2.textContent = formatTime(song.currentTime)
    updateProgressBarColor()
  })

  const playButtons = document.querySelectorAll(".play")
  const playButtons2 = document.querySelectorAll("#play1img")

  playButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ContrlIcn.classList.replace("fa-play", "fa-pause")
    })
  })
  playButtons2.forEach((button) => {
    button.addEventListener("click", () => {
      ContrlIcn.classList.replace("fa-play", "fa-pause")
    })
  })
  playButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault()
      const audioPlayer = document.querySelector("audio")

      if (audioPlayer.src === this.closest(".cards").querySelector("a").href) {
        togglePlayPause()
      } else {
        audioPlayer.src = this.closest(".cards").querySelector("a").href
        playMusic()
      }
    })
  })

  playButtons2.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault()
      const audioPlayer = document.querySelector("audio")
      const anchor = this.closest(".sngctn").querySelector("a")
      audioPlayer.src = anchor.href
      audioPlayer.play()
    })
  })

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")

    return `${formattedMinutes}:${formattedSeconds}`
  }

  song.addEventListener("timeupdate", () => {
    const currentTimeDisplay = document.getElementById("timeDisplayLeft")
    const durationDisplay = document.getElementById("timeDisplayRight")

    currentTimeDisplay.textContent = formatTime(song.currentTime)
    durationDisplay.textContent = formatTime(song.duration)
  })

  const slider = document.querySelector(".hamburger")
  const left = document.querySelector(".left")
  slider.addEventListener("click", function () {
    left.style.left = 0
  })

  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".left").style.left = "-100%"
  })

  document.querySelector("#home").addEventListener("click", function () {
    left.style.left = "-100%"
  })
  const playlist = [
    "songs/Ishq Jaisa Kuch Fighter 320 Kbps.mp3",
    "songs/O Maahi - Dunki.mp3",
    "songs/Sher Khul Gaye.mp3",
    "songs/Papa Meri Jaan Animal 320 Kbps.mp3",
    "songs/Hua Main Animal 320 Kbps.mp3",
    "songs/Haiwaan_320-(PagalWorld.Com.IN).mp3",
    "songs/04 - Arjan Vailly (320 Kbps).mp3",
    "songs/Pehle Bhi Main Animal 320 Kbps.mp3",
    "songs/_Heeriye_320(PagalWorld.com.pe).mp3",
    "songs/_Ram Siya Ram_320(PagalWorld.com.pe).mp3",
    "songs/Maine Pi Rakhi Hai_320(PagalWorld.com.pe).mp3",
    "songs/Tere Pyar Mein_320(PagalWorld.com.pe).mp3",
    "songs/Show Me The Thumka_320(PagalWorld.com.pe).mp3",
    "songs/Cartoon - On & On (feat. Daniel Levi) [NCS Release].mp3",
    "songs/Different Heaven & EH!DE - My Heart [NCS Release].mp3",
    "songs/Elektronomia - Sky High pt.II [NCS Release].mp3",
    "songs/TULE - Fearless pt.II (feat. Chris Linton) [NCS Release].mp3",
    "songs/Arya & blankfaces - Daydream [NCS Release].mp3",
    "songs/Desmeon - Hellcat [NCS Release].mp3",
    "songs/Jo Cohen & Sex Whales - We Are [NCS Release]",
    "songs/Jim Yosef - Firefly [NCS Release].mp3",
    "songs/Bad Girl.mp3",
    "songs/Cartoon - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3",
  ]

  let song_playing = false
  function songPlay() {
    song_playing = true
    audio.play()
  }
  let i = 0
  function playPrevious() {
    i = (i - 1 + playlist.length) % playlist.length
    loadSong()
  }
  function playNext() {
    i = (i + 1) % playlist.length
    loadSong()
  }
  document.getElementById("previous").addEventListener("click", playPrevious)
  document.getElementById("next").addEventListener("click", playNext)

  function loadSong() {
    song.src = playlist[i]
    song.play()
    song_playing = true
  }

  // Volume Button
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Started Volume", e.target.value, "/100")
      const volumeValue = Math.max(
        0,
        Math.min(1, parseInt(e.target.value) / 100)
      )
      song.volume = volumeValue
    })
  const range = document.querySelector(".range")
  document.querySelector(".volume").addEventListener("click", () => {
    range.classList.remove("hidden")
  })

  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      togglePlayPause()
    }
  })
})
