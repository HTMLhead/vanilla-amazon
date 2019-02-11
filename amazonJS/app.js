import { ScrollEvent_sticky } from "./scrollEvent-Sticky.js";
import { Carousel_middle } from "./carousel-middle.js";

document.addEventListener("DOMContentLoaded", () => {
  const scrollEvent_sticky = new ScrollEvent_sticky({
    header: "header",
    stickyLayer: ".top-layer-container",
    hiddenLayer: ".prime-member-container"
  });
  const carousel_middle = new Carousel_middle({
    container: ".middle-body-carousel-list",
    rightBtn: ".middle-body-carousel-right-button",
    leftBtn: ".middle-body-carousel-left-button",
    anchorEl: ".middle-body-carousel-url"
  },{
    ajaxDataUrl: "./jsonData/data.json"
  },{
    carouselSize: "230px",
    carouselAutoMovingMS: 3000,
    autoEventStopContainer: ".middle-body-carousel",
    transitionTime: "0.1s",
    transitionPart: "all",   
  });
});
