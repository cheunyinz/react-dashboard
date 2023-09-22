import { useState, useRef, useEffect } from "react";
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
  const [offset, setOffset] = useState(0);
  const [extraOffset, setExtraOffset] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [startMouseX, setStartXPos] = useState(0);
  const [currentMouseX, setCurrentMouseX] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const carouselElement = carouselRef.current;
      const carouselInnerElement = carouseInnerRef.current;
      if (carouselElement && carouselInnerElement) {
        const width = carouselElement.getBoundingClientRect().width;
        setImageWidthValue(Number(width.toFixed(2)));
        setOffset(activeIndex * -Number(width.toFixed(2)));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
    setOffset(newActiveIndex * -imageWidthValue);
  };

  const nextImage = () => {
    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");
    let newActiveIndex =
      activeIndex === imageData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
  };

  const enterSlider = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  };
  const pressingSlider = (e: any) => {
    setPressedState(true);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }

    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.remove("carousel__list--animation");
    setStartXPos(e.clientX);
  };

  const dragSlider = (e: any) => {
    if (pressedState === false) return;
    let current = e.clientX;
    let newCurrentMouseX = current - startMouseX;
    console.log(imageData.length);
    if (offset + extraOffset > 0) {
      newCurrentMouseX = 0;
      console.log("LEFT OVERFLOW");
    } else if (
      offset + extraOffset <
      (imageData.length - 1) * -imageWidthValue
    ) {
      console.log("RIGHT OVERFLOW");
    }

    setCurrentMouseX(newCurrentMouseX);
    setExtraOffset(newCurrentMouseX);
  };

  const unpressSlider = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
    setPressedState(false);

    const newActiveIndex = Math.round(
      (activeIndex * -imageWidthValue + currentMouseX) / -imageWidthValue
    );

    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");

    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
    setExtraOffset(0);
    // debugger;
  };

  const exitSlider = () => {
    if (pressedState === false) return;
    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * -imageWidthValue + currentMouseX) / -imageWidthValue
    );

    let element = document.querySelector(".carousel__list");
    if (!element) {
      return;
    } else element.classList.add("carousel__list--animation");

    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
    setExtraOffset(0);
  };

  const buttonsAndStyling: M2ButtonsGroupProps = {
    buttons: [
      {
        text: "PREV",
        state: "default",
        onClick: () => prevImage(),
      },
      {
        text: "NEXT",
        state: "default",
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
        onMouseDown={(e) => pressingSlider(e)}
        onMouseMove={(e) => dragSlider(e)}
        onMouseUp={unpressSlider}
        onMouseLeave={exitSlider}
        ref={carouselRef}
      >
        <ul
          ref={carouseInnerRef}
          className="carousel__list carousel__list--animation "
          style={{
            transform: `translate3d(${offset + extraOffset}px, 0,0)`,
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
