const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")


const game = new Game(ctx)

const btn = document.getElementById("start-btn")
btn.onclick = () => {
  const welcome = document.getElementById("welcome")
  welcome.remove()
  canvas.style.display = 'flex'
  game.start()
  btnMusic.classList.remove("hidden")
}

const btnMusic = document.getElementById("musicoff")
btnMusic.onclick = () => {
  game.audioFight.pause()
  game.audioDie.src = ""
  game.audioOver.src = ""
  game.audioHit.src = ""
  game.ax.punchAudio.src = ""
  game.ax.jumpAudio.src = ""
  game.ax.quitLifeAudio.src = ""
}