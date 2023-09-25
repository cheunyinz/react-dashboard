import { useState, useRef, useEffect, MouseEvent } from "react";
import { debounce } from "lodash";
import A6Image, { A6ImageProps } from "../../../atoms/a6-image/A6-image";
import M2ButtonsGroup, {
  M2ButtonsGroupProps,
} from "../../../molecules/m2-buttons-group/M2-buttons-group";

const Carousel = ({ imageData }: { imageData: A6ImageProps[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouseInnerRef = useRef<HTMLUListElement>(null);
  const [imageWidthValue, setImageWidthValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressedState, setPressedState] = useState(false);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [startMouseX, setStartXPos] = useState(0);
  const [currentMouseX, setCurrentMouseX] = useState(0);

  const toggleTransisationStyling = debounce(() => {
    console.log(" not resizing debounced");
    let element = document.querySelector(".carousel__list");

    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");
  }, 300);

  useEffect(() => {
    const getImageWidthValue = () => {
      const carouselElement = carouselRef.current;
      const carouselInnerElement = carouseInnerRef.current;
      if (carouselElement && carouselInnerElement) {
        const width = carouselElement.getBoundingClientRect().width;
        setImageWidthValue(Number(width.toFixed(2)));
        setSliderOffset(activeIndex * -Number(width.toFixed(2)));
      }
    };

    const handleResize = () => {
      getImageWidthValue();
      let element = document.querySelector(".carousel__list");

      if (!element) {
        return;
      } else element.classList.remove("carousel__list--animation");

      console.log("resize");
    };

    getImageWidthValue();
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", toggleTransisationStyling);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", toggleTransisationStyling);
    };
  }, [activeIndex]);

  const prevImage = () => {
    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");
    let newActiveIndex =
      activeIndex === 0 ? imageData.length - 1 : activeIndex - 1;
    setActiveIndex(newActiveIndex);
    setSliderOffset(newActiveIndex * -imageWidthValue);
  };

  const nextImage = () => {
    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");
    let newActiveIndex =
      activeIndex === imageData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newActiveIndex);
    setSliderOffset(newActiveIndex * -imageWidthValue);
  };

  const enterSlider = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  };
  const pressingSlider = (event: MouseEvent) => {
    setPressedState(true);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }

    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.remove("carousel__list--animation");
    setStartXPos(event.clientX);
  };

  const dragSlider = (event: MouseEvent) => {
    if (pressedState === false) return;
    let current = event.clientX;
    let newCurrentMouseX = current - startMouseX;
    let newSliderOffset = activeIndex * -imageWidthValue + newCurrentMouseX;

    let modifiedSliderOffset = newSliderOffset;

    if (newSliderOffset > 0) {
      modifiedSliderOffset = 0;
    } else if (newSliderOffset < (imageData.length - 1) * -imageWidthValue) {
      modifiedSliderOffset = (imageData.length - 1) * -imageWidthValue;
    }
    setCurrentMouseX(newCurrentMouseX);
    setSliderOffset(modifiedSliderOffset);
  };

  const unpressSlider = () => {
    if (pressedState === false) return;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }

    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * -imageWidthValue + currentMouseX) / -imageWidthValue
    );

    let newSliderOffset = newActiveIndex * -imageWidthValue + 0;

    let element = document.querySelector(".carousel__list");

    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");

    if (
      newSliderOffset > 0 ||
      newSliderOffset <= imageData.length * -imageWidthValue
    ) {
    } else {
      setSliderOffset(newSliderOffset);
      setActiveIndex(newActiveIndex);
    }
  };

  const exitSlider = () => {
    if (pressedState === false) return;

    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * -imageWidthValue + currentMouseX) / -imageWidthValue
    );

    let newSliderOffset = newActiveIndex * -imageWidthValue + 0;

    let element = document.querySelector(".carousel__list");

    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");

    if (
      newSliderOffset > 0 ||
      newSliderOffset <= imageData.length * -imageWidthValue
    ) {
    } else {
      setSliderOffset(newSliderOffset);
      setActiveIndex(newActiveIndex);
    }
  };

  const prevButtonState = activeIndex === 0 ? "disabled" : "default";

  const nextButtonState =
    activeIndex === imageData.length - 1 ? "disabled" : "default";

  const buttonsAndStyling: M2ButtonsGroupProps = {
    buttons: [
      {
        text: "PREV",
        state: prevButtonState,
        onClick: () => prevImage(),
      },
      {
        text: "NEXT",
        state: nextButtonState,
        onClick: () => nextImage(),
      },
    ],
    styling: "carousel__buttons-group",
  };

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        onMouseEnter={enterSlider}
        onMouseDown={(event) => pressingSlider(event)}
        onMouseMove={(event) => dragSlider(event)}
        onMouseUp={unpressSlider}
        onMouseLeave={exitSlider}
        ref={carouselRef}
      >
        <ul
          ref={carouseInnerRef}
          className="carousel__list carousel__list--animation "
          style={{
            transform: `translate3d(${sliderOffset}px, 0,0)`,
          }}
        >
          {imageData.map((item) => (
            <li className="carousel__item" key={item.src}>
              <A6Image {...item} />
            </li>
          ))}
        </ul>
      </div>
      <M2ButtonsGroup {...buttonsAndStyling} />
    </div>
  );
};

export default Carousel;
