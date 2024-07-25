const grandParent = document.querySelector("#grand-parent");

const children = grandParent.querySelectorAll(".child");
const parent = grandParent.querySelector(".red");

parent.style.color = "green";

children.forEach((child) => {
  child.style.color = "red";
});
