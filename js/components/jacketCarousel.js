import { arrowLeft, arrowRight } from "../templates/svgIcons.js";
import jacketBox from "../templates/jacketBox.js";

const startCarousel = (jacketDivs, jacketSlider) => {
  let centerJacketIndex = 0; //Index that will be rendered in the center of the screen

  const indexMinusOne = (index) => {
    const minusOne = index - 1;
    if(minusOne < 0){
      return jacketDivs.length - 1;
    }
    return minusOne;
  }

  const indexPlusOne = (index) => {
    const plusOne = index + 1;
    if(plusOne >= jacketDivs.length){
      return 0;
    }
    return plusOne;
  }

  const addJacketOnTop = (jacketIndex) => {
    jacketSlider.insertAdjacentHTML("afterbegin", jacketDivs[jacketIndex].outerHTML);
  }

  const addJacketBelow = (jacketIndex) => {
    jacketSlider.insertAdjacentHTML("beforeend", jacketDivs[jacketIndex].outerHTML);
  }

  const hideAllJackets = () => {
    jacketSlider.querySelectorAll(".jacket-box")
      .forEach(jacket => jacket.remove());
  }

  const showJackets = () => {
    hideAllJackets();
    addJacketOnTop(centerJacketIndex);

    const minusOne = indexMinusOne(centerJacketIndex);
    const minusTwo = indexMinusOne(minusOne);
    const minusThree = indexMinusOne(minusTwo);
    addJacketOnTop(minusOne);
    addJacketOnTop(minusTwo);
    addJacketOnTop(minusThree);

    const plusOne = indexPlusOne(centerJacketIndex);
    const plusTwo = indexPlusOne(plusOne);
    const plusThree = indexPlusOne(plusTwo);
    addJacketBelow(plusOne);
    addJacketBelow(plusTwo);
    addJacketBelow(plusThree);
  }
  showJackets();
  
  const goLeft = () => {
    centerJacketIndex = indexMinusOne(centerJacketIndex);
    showJackets();
  }
  document.querySelector(".control-previous").addEventListener("click", goLeft);
  
  const goRight = () => {
    centerJacketIndex = indexPlusOne(centerJacketIndex);
    showJackets();
  }
  document.querySelector(".control-next").addEventListener("click", goRight);
};

const controlElement = (direction, iconFunction) => /*template*/`
  <button class="controls control-${direction}" aria-label="${direction}">
    ${iconFunction()}
  </div>`;

const createCarousel = (jacketList, wrapperSelector) => {
  //Add all jackets and buttons
  const jacketWrapper = document.querySelector(wrapperSelector);
  jacketWrapper.insertAdjacentHTML("beforeend", controlElement("previous", arrowLeft));
  jacketWrapper.insertAdjacentHTML("beforeend", controlElement("next", arrowRight));

  const jacketSlider = jacketWrapper.querySelector(".jacket-slider");
  jacketList.forEach((jacket) =>
    jacketSlider.insertAdjacentHTML("beforeend", jacketBox(jacket, "h3"))
  )

  //Copy html so that I can shuffle them around inside carusel
  const jacketDivs = [...jacketSlider.querySelectorAll(".jacket-box")];
  startCarousel(jacketDivs, jacketSlider);
};

export default createCarousel;