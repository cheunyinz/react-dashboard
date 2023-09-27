import { useState, useRef, useEffect, MouseEvent, useCallback } from "react";
import { useMount } from "react-use";
import { debounce } from "lodash";
import A6Image, { A6ImageProps } from "../../../atoms/a6-image/A6-image";
import M2ButtonsGroup, {
  M2ButtonsGroupProps,
} from "../../../molecules/m2-buttons-group/M2-buttons-group";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const GsapCarousel = ({ imageData }: { imageData: A6ImageProps[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  gsap.registerPlugin(Draggable);

  const prevButtonState = activeIndex === 0 ? "disabled" : "default";

  const nextButtonState =
    activeIndex === imageData.length - 1 ? "disabled" : "default";

  const buttonsAndStyling: M2ButtonsGroupProps = {
    buttons: [
      {
        text: "PREV",
        state: prevButtonState,
        // onClick: () => clickPreviousImage(),
      },
      {
        text: "NEXT",
        state: nextButtonState,
        // onClick: () => clickNextImage(),
      },
    ],
    styling: "gsap-carousel__buttons-group",
  };

  return (
    <div className="gsap-carousel">
      <div className="gsap-carousel__container">
        <ul className={`gsap-carousel__list `}>
          {imageData.map((item) => (
            <li className="gsap-carousel__item" key={item.src}>
              <A6Image {...item} />
            </li>
          ))}
        </ul>
      </div>
      <M2ButtonsGroup {...buttonsAndStyling} />
    </div>
  );
};

export default GsapCarousel;
