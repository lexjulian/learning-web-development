const body = document.querySelector("body");

document.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  body.style.background = e.target.innerText;

  if (e.target.innerText === "Random") {
    const randomNumber = Math.floor(Math.random() * 11);
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "#6600FF",
      "#000000",
      "#ff8000",
      "#8c8c8c",
      "#6c0bd2",
      "aquamarine",
    ];
    body.style.background = colors[randomNumber];
  }
});
