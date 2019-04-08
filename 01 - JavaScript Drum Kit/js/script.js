function playSound(e) {
  // console.log(e.keyCode);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; //stops function from running altogether
  audio.currentTime = 0; //rewinds to start
  audio.play();
  // console.log(key);
  key.classList.add("playing"); //adds class playing

  // key.classList.remove('playing');
  // key.classList.toggle('playing');

  // setTimeout(function() {
  // }, 0.07) //function to set timeout
}

function removeTransition(e) {
  // console.log(e);
  if (e.propertyName !== "transform") return; //skip it if its not a transform
  // console.log(e.propertyName);
  this.classList.remove("playing");
  // console.log(this);
}

const keys = document.querySelectorAll(".key");
// keys.addEventListener('transitionend'); // jquery
keys.forEach(key =>
  key.addEventListener("transitionend", removeTransition)
);

window.addEventListener("keydown", playSound);