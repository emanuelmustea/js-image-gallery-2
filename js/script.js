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

const cloneImages = () => {
  let firstImage = images[0];
  let lastImage = images[imagesCount - 1];
  sliderContainer.appendChild(firstImage.cloneNode(true));
  sliderContainer.insertBefore(lastImage.cloneNode(true), images[0]);
  images = document.querySelectorAll(".carousel > .slider > img");
};

const disableSliding = element => {
  setTimeout(() => {
    isSliding = false;
    element.classList.remove("disabled");
  }, transitionDuration);
};
const enableSliding = element => {
  isSliding = true;
  element.classList.add("disabled");
  disableSliding(element);
};

const moveSliderContainer = (animate = true) => {
  sliderContainer.style.left = `${-1 *
    currentImageIndex *
    carouselContainerWidth}px`;
  if (animate) {
    sliderContainer.style.transition = `left ${transitionDuration}ms`;
    setTimeout(() => {
      sliderContainer.style.transition = `left 0ms`;
    }, transitionDuration);
  }
};
const nextPhoto = event => {
  if (isSliding) return;
  if (currentImageIndex < imagesCount) {
    currentImageIndex++;
    moveSliderContainer();
  } else {
    currentImageIndex++;
    moveSliderContainer();
    setTimeout(() => {
      currentImageIndex = 1;
      moveSliderContainer(false);
    }, transitionDuration);
  }
  enableSliding(event.srcElement);
};

const prevPhoto = event => {
  if (isSliding) return;
  if (currentImageIndex > 1) {
    currentImageIndex--;
    moveSliderContainer();
  } else {
    currentImageIndex--;
    moveSliderContainer();
    setTimeout(() => {
      currentImageIndex = imagesCount;
      moveSliderContainer(false);
    }, transitionDuration);
  }
  enableSliding(event.srcElement);
};

nextButton.addEventListener("click", event => nextPhoto(event));
prevButton.addEventListener("click", event => prevPhoto(event));
cloneImages();
