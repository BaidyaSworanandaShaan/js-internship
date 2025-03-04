const imgGallery = [
  "img/img1.jpg",
  "img/img2.jpg",
  "img/img3.jpg",
  "img/img4.jpg",
];

const containerEl = document.getElementById("main-container");

const btnBack = document.getElementById("btn-back");
const btnNext = document.getElementById("btn-next");
const navContainerEl = document.getElementById("nav-container");

const imageDimension = 500;
const imgContainer = document.createElement("div");
imgContainer.classList.add("img-container");
imgContainer.style.transition = "transform 0.5s ease-in-out";
imgGallery.map((image, index) => {
  const img = document.createElement("img");
  img.src = image;
  img.style.height = imageDimension + "px";
  img.style.width = imageDimension + "px";
  img.classList.add("image");
  imgContainer.appendChild(img);
  containerEl.classList.add("main-container");
  containerEl.appendChild(imgContainer);
});
let slideNumber = 1;

function getNextSlide() {
  imgContainer.style.transform = `translateX(-${
    slideNumber * imageDimension
  }px)`;
  slideNumber++;
}
function getPreviousSlide() {
  imgContainer.style.transform = `translateX(-${
    (slideNumber - 2) * imageDimension
  }px)`;
  slideNumber--;
}

function getFirstSlide() {
  imgContainer.style.transform = `translateX(${0}px)`;
  slideNumber = 1;
}
function getLastSlide() {
  slideNumber = imgGallery.length;
  imgContainer.style.transform = `translateX(-${
    (slideNumber - 1) * imageDimension
  }px)`;
}
console.log(slideNumber);
btnNext.addEventListener("click", function (e) {
  if (slideNumber < imgGallery.length) {
    getNextSlide();
  } else {
    getFirstSlide();
  }
  console.log(slideNumber);
});
btnBack.addEventListener("click", function (e) {
  if (slideNumber > 1) {
    getPreviousSlide();
  } else {
    getLastSlide();
  }
  console.log(slideNumber);
});
setInterval(() => {
  if (slideNumber < imgGallery.length) {
    getNextSlide();
  } else {
    getFirstSlide();
  }
}, 4000);
