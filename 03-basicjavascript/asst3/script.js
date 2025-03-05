// function changeSlider(e) {
//   listofImgDivs.forEach((imgContainer) => {
//     let previousLeft = parseInt(imgContainer.style.left) || 0;
//     console.log(previousLeft);
//     if (e.target.id == "btn-next") {
//       if (previousLeft === (imgGallery.length - 1) * -400) {
//         previousLeft = 400;
//       }
//       imgContainer.style.left = `${previousLeft - 400}px`;
//     } else {
//       if (previousLeft === (imgGallery.length - 1) * 400) {
//         previousLeft = -400;
//       }
//       imgContainer.style.left = `${previousLeft + 400}px`;
//     }
//   });
// }

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

let leftPosition = 0;
imgGallery.map((image, index) => {
  const imgContainer = document.createElement("div");

  imgContainer.id = `img-${index}`;
  imgContainer.style.top = "0";
  imgContainer.style.left = leftPosition + "px";
  leftPosition = leftPosition + 400;
  const img = document.createElement("img");
  img.src = image;
  imgContainer.appendChild(img);
  imgContainer.classList.add("img-container");
  containerEl.appendChild(imgContainer);

  // Nav List

  const imgNumber = document.createElement("span");
  imgNumber.id = `nav-${index}`;
  imgNumber.textContent = index;
  navContainerEl.appendChild(imgNumber);
});

const listofImgDivs = containerEl.childNodes;
const listofNavItem = navContainerEl.childNodes;

listofNavItem.forEach((element) => {
  element.addEventListener("mouseover", function (e) {
    element.style.cursor = "pointer";
  });
  element.addEventListener("click", function (e) {
    const newLeft = parseInt(e.target.textContent) * -400;
    listofImgDivs.forEach((imgContainer) => {
      imgContainer.style.left = `${
        parseInt(imgContainer.id.split("-")[1]) * 400 + newLeft
      }px`;
    });
  });
});

listofImgDivs[0].classList.add("img-container--active");
btnBack.addEventListener("click", changeSlider);
btnNext.addEventListener("click", changeSlider);

// function changeSlider(e) {
//   listofImgDivs.forEach((imgContainer) => {
//     let previousLeft = parseInt(imgContainer.style.left) || 0;
//     console.log("Previous Left :");
//     console.log(previousLeft);
//     if (e.target.id == "btn-next") {
//       if (previousLeft === (imgGallery.length - 1) * -400) {
//         listofImgDivs.forEach((imgContainer) => {
//           imgContainer.style.left = `${
//             parseInt(imgContainer.id.split("-")[1]) * 400
//           }px`;
//           console.log("Initial");
//           console.log(imgContainer);
//         });
//       }
//       imgContainer.style.left = `${previousLeft - 400}px`;
//     } else {
//       if (previousLeft === (imgGallery.length - 1) * 400) {
//         previousLeft = -400;
//       }
//       imgContainer.style.left = `${previousLeft + 400}px`;
//     }
//   });
// }

let counter = listofImgDivs.length;

function changeSlider(e) {
  if (e.target.id === "btn-next") {
    if (counter > 1) {
      counter--;
      listofImgDivs.forEach((imgContainer) => {
        let currentLeft = parseInt(imgContainer.style.left);
        imgContainer.style.left = `${currentLeft - 400}px`;
      });
    }
  } else if (e.target.id === "btn-back") {
    if (counter < listofImgDivs.length) {
      counter++;
      listofImgDivs.forEach((imgContainer) => {
        let currentLeft = parseInt(imgContainer.style.left);
        imgContainer.style.left = `${currentLeft + 400}px`;
      });
    }
  }
}
