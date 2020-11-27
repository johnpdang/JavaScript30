const divs = document.querySelectorAll("div");

function logText(e) {
  console.llog(this.classList.value);
//   e.stopPropagation(); //stop bubbling
  //   console.log(this);
}

// document.body.addEventListener("click", logText);

divs.forEach((div) =>
  div.addEventListener("click", logText, {
    capture: false, //default bubbling
    once: true //unbinds itself
  })
);
