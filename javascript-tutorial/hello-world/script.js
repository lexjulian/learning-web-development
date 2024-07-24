const divWithId = document.getElementById("div-id");

divWithId.style.color = "red";

const divWithClass = document.getElementsByClassName("div-class");

const divWithClassArray = Array.from(divWithClass);

divWithClassArray.forEach((div) => (div.style.color = "green"));
