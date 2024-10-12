let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");

let contentTable = document.getElementById("contentTable");
let slide1 = "img/content/table-0.png";
let slide2 = "img/content/table-1.png";
let slide3 = "img/content/table-2.png";
let slide4 = "img/content/table-3.png";
let slide5 = "img/content/table-4.png";
let slide6 = "img/content/table-5.png";

btn1.onclick = function () {
  btn1.classList.add("active");

  contentTable.src = slide1;

  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
  btn6.classList.remove("active");
};

btn2.onclick = function () {
  btn2.classList.add("active");

  contentTable.src = slide2;

  btn1.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
  btn6.classList.remove("active");
};

btn3.onclick = function () {
  btn3.classList.add("active");

  contentTable.src = slide3;

  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
  btn6.classList.remove("active");
};

btn4.onclick = function () {
  btn4.classList.add("active");

  contentTable.src = slide4;

  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn5.classList.remove("active");
  btn6.classList.remove("active");
};

btn5.onclick = function () {
  btn5.classList.add("active");

  contentTable.src = slide5;

  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn6.classList.remove("active");
};

btn6.onclick = function () {
  btn6.classList.add("active");

  contentTable.src = slide6;

  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.remove("active");
};
