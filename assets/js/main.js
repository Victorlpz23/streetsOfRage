const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")


const game = new Game(ctx)

const inst = document.getElementById("instructions")
const btn = document.getElementById("start-btn")
btn.onclick = () => {
  const welcome = document.getElementById("welcome")
  welcome.remove()
  canvas.style.display = 'flex'
  game.start()
  btnMusicOn.classList.remove("hidden")
  btnMusicOff.classList.remove("hidden")
  inst.classList.remove("hidden")
}

const btnMusicOff = document.getElementById("musicoff")
const btnMusicOn = document.getElementById("musicon")
btnMusicOff.onclick = () => {
  game.audioFight.pause()
  game.audioDie.src = ""
  game.audioDieGirl.src = ""
  game.audioOver.src = ""
  game.audioHit.src = ""
  game.ax.punchAudio.src = ""
  game.ax.jumpAudio.src = ""
  game.ax.quitLifeAudio.src = ""
}

btnMusicOn.onclick = () => {
  game.audioFight.play()
  game.audioDie.src = "../../assets/resources/enemyDie.wav"
  game.audioDieGirl.src = "../../assets/resources/girlDie.wav"
  game.audioOver.src = "../../assets/resources/19 Game Over.mp3"
  game.audioHit.src = "../../assets/resources/hit.wav"
  game.ax.punchAudio.src = "../../assets/resources/punch.wav"
  game.ax.jumpAudio.src = "../assets/resources/jump.wav"
  game.ax.quitLifeAudio.src = "../../assets/resources/quitLife.wav"
}

