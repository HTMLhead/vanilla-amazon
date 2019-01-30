import { qs, getAjax } from "./util.js";

class Carousel_middle {
  constructor(elObj, urlObj, optionObj) {
    this.container = qs(elObj.container);
    this.right = qs(elObj.rightBtn);
    this.left = qs(elObj.leftBtn);
    this.showingLinkEl = qs(elObj.showingLinkEl);
    this.jsonUrl = urlObj.jsonUrl;
    this.length = optionObj.movingLength;
    this.time = optionObj.movingTime;
    this.transitioning = optionObj.transitioning;
    this.playBool = false;
    this.isMouseOver = false;
    this.init();
  }

  init() {
    getAjax(this.handler.bind(this), this.jsonUrl);
    this.checkAuto();
    this.carouselAuto();
  }

  handler(parsedObj) {
    const imgUrlArr = parsedObj.backgroundUrl;
    const linkUrlArr = parsedObj.linkArr;
    this.imgUrlArr = imgUrlArr.map(v => v);
    this.linkUrlArr = linkUrlArr.map(v => v);
    this.right.addEventListener("click", this.moveRight.bind(this));
    this.left.addEventListener("click", this.moveLeft.bind(this));
  }

  moveAuto() {
    if (this.isMouseOver) {
      setTimeout(this.moveAuto.bind(this), 2000);
      return;
    }
    this.moveRight();
    setTimeout(this.moveAuto.bind(this), 2000);
  }

  moveRight() {
    if (this.playBool) return;
    this.playBool = true;
    this.imgUrlArr.push(this.imgUrlArr.shift());
    this.linkUrlArr.push(this.linkUrlArr.shift());
    this.initLink();
    this.container.style.transform = `translateX(-${this.length})`;
    this.transitionendEvent();
  }

  moveLeft() {
    if (this.playBool) return;
    this.playBool = true;
    this.imgUrlArr.unshift(this.imgUrlArr.pop());
    this.linkUrlArr.unshift(this.linkUrlArr.pop());
    this.initLink();
    this.container.style.transform = `translateX(${this.length})`;
    this.transitionendEvent();
  }

  initLink() {
    this.showingLinkEl.href = `${this.linkUrlArr[1]}`
  }
  
  transitionendEvent() {
    this.container.addEventListener(
      "transitionend",
      this.shuffleArr.bind(this)
    );
    this.container.style.transition = `${this.transitioning} ${this.time}`;
  }

  shuffleArr() {
    this.imgUrlArr.forEach((v, i) => {
      const part = qs(`.index${i}`);
      part.style = `background-image:url(${v})`;
    });
    this.container.style.transition = "all 0s";
    this.container.style.transform = "translateX(0px)";
    this.playBool = false;
  }

  checkAuto() {
    const middleBodyCarousel = document.querySelector(".middle-body-carousel");
    middleBodyCarousel.addEventListener("mouseover", this.mouseOver.bind(this));
    middleBodyCarousel.addEventListener("mouseout", this.mouseOut.bind(this));
  }

  mouseOver() {
    this.isMouseOver = true;
  }

  mouseOut() {
    this.isMouseOver = false;
  }

  carouselAuto() {
    setTimeout(this.moveAuto.bind(this), 3000);
  }
}

export { Carousel_middle };
