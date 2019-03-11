// a list of all images
let images = document.querySelectorAll(".carousel > .slider > img");
let container = document.querySelector(".carousel");
let slider = document.querySelector(".carousel > .slider");
let next = document.querySelector(".carousel > .next");
let prev = document.querySelector(".carousel > .prev");
//i is the current image
let i = 1;
let max = images.length;
//the width of the carousel container
let width = container.offsetWidth;
let running = false;
let duration = 1000;

const disableRunning = element => {
  setTimeout(() => {
    running = false;
    element.classList.remove("disabled");
  }, duration);
};

const enableRunning = element => {
  running = true;
  element.classList.add("disabled");
  disableRunning(element);
};

const changeLeft = () => {
  slider.style.transition = `left ${duration}ms`;
  setTimeout(() => {
    slider.style.transition = `left 0ms`;
  }, duration);
  slider.style.left = `${-1 * i * width}px`;
};
const reorder = type => {
  if (type == "last") {
    slider.style.left = "0px";
    slider.insertBefore(images[max - 1], images[0]);
    images = document.querySelectorAll(".carousel > .slider > img");
  }
  if (type == "first") {
    slider.style.left = `${-1 * i * width}px`;
    slider.appendChild(images[0]);
    images = document.querySelectorAll(".carousel > .slider > img");
  }
};
next.addEventListener("click", e => {
  if (!running) {
    if (i < max - 1) {
      i++;
      changeLeft();
    } else {
      i = 0;
      reorder("last");
      i++;
      setTimeout(() => {
        changeLeft();
      }, 1);
    }
    enableRunning(e.srcElement);
  }
});
prev.addEventListener("click", e => {
  if (!running) {
    if (i >= 1) {
      i--;
      changeLeft();
    } else {
      i = max - 1;
      reorder("first");
      i--;
      setTimeout(() => {
        changeLeft();
      }, 1);
    }
    enableRunning(e.srcElement);
  }
});
