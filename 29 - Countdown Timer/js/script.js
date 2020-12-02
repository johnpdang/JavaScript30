let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(secs) {
  // clear any existing timers
  clearInterval(countdown);

  //   setInterval(function () {
  //     secs--;
  //   }, 1000);
  //   const now = new Date().getTime();
  const now = Date.now();
  const then = now + secs * 1000;
  //   console.log({ now, then });
  displayTimeLeft(secs);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop it
    if (secsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secsLeft);
  }, 100);
}

function displayTimeLeft(secs) {
  const mins = Math.floor(secs / 60);
  const remainderSecs = secs % 60;
  const display = `${mins}:${remainderSecs < 10 ? "0" : ""}${remainderSecs}`;
  document.title = display;
  timerDisplay.textContent = display;
  //   console.log({ mins, remainderSecs });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const secs = parseInt(this.dataset.time);
  //   console.log(secs);
  timer(secs);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
