// a list of all images
let carouselContainer = document.querySelector(".carousel");
let sliderContainer = document.querySelector(".carousel > .slider");

let images = document.querySelectorAll(".carousel > .slider > img");
let imagesCount = images.length;

let nextButton = document.querySelector(".carousel > .next");
let prevButton = document.querySelector(".carousel > .prev");

let currentImageIndex = 1;
let carouselContainerWidth = carouselContainer.offsetWidth;
let isSliding = false;
let transitionDuration = 1000;

sliderContainer.insertBefore(images[imagesCount - 1], images[0]);
images = document.querySelectorAll(".carousel > .slider > img");

const disableRunning = element => {
  setTimeout(() => {
    isSliding = false;
    element.classList.remove("disabled");
  }, transitionDuration);
};

const enableRunning = element => {
  isSliding = true;
  element.classList.add("disabled");
  disableRunning(element);
};

const moveSliderContainer = () => {
  sliderContainer.style.transition = `left ${transitionDuration}ms`;
  setTimeout(() => {
    sliderContainer.style.transition = `left 0ms`;
  }, transitionDuration);
  sliderContainer.style.left = `${-1 *
    currentImageIndex *
    carouselContainerWidth}px`;
};
const reorderLastImage = type => {
  sliderContainer.style.left = "0px";
  sliderContainer.insertBefore(images[imagesCount - 1], images[0]);
  images = document.querySelectorAll(".carousel > .slider > img");
};
const reorderFirstImage = type => {
  sliderContainer.style.left = `${-1 *
    currentImageIndex *
    carouselContainerWidth}px`;
  sliderContainer.appendChild(images[0]);
  images = document.querySelectorAll(".carousel > .slider > img");
};
nextButton.addEventListener("click", e => {
  if (!isSliding) {
    if (currentImageIndex < imagesCount - 1) {
      currentImageIndex++;
      moveSliderContainer();
    } else {
      currentImageIndex = 0;
      reorderLastImage();
      currentImageIndex++;
      setTimeout(() => {
        moveSliderContainer();
      }, 1);
    }
    enableRunning(e.srcElement);
  }
});
prevButton.addEventListener("click", e => {
  if (!isSliding) {
    if (currentImageIndex >= 1) {
      currentImageIndex--;
      moveSliderContainer();
    } else {
      currentImageIndex = imagesCount - 1;
      reorderFirstImage();
      currentImageIndex--;
      setTimeout(() => {
        moveSliderContainer();
      }, 1);
    }
    enableRunning(e.srcElement);
  }
});
