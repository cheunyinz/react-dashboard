import { useState, useRef, useEffect, MouseEvent, useCallback } from "react";
import { useMount } from "react-use";
import { debounce } from "lodash";
import A6Image, { A6ImageProps } from "../../../atoms/a6-image/A6-image";
import M2ButtonsGroup from "../../../molecules/m2-buttons-group/M2-buttons-group";
import A4Button from "../../../atoms/a4-button/A4-button";

const Carousel = ({ imageData }: { imageData: A6ImageProps[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouseInnerRef = useRef<HTMLUListElement>(null);
  const imageWidthValue = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressedState, setPressedState] = useState(false);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [startMouseX, setStartXPos] = useState(0);
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [shouldTransistion, setShouldTransistion] = useState(true);
  const carouselElement = carouselRef.current;
  useMount(() => {
    getImageWidthValue();
  });

  const toggleTransitionStyling = debounce(() => {
    setShouldTransistion(true);
  }, 200);

  const getImageWidthValue = useCallback(() => {
    const carouselElement = carouselRef.current;
    const carouselInnerElement = carouseInnerRef.current;

    if (carouselElement && carouselInnerElement) {
      const width = carouselElement.getBoundingClientRect().width;
      imageWidthValue.current = Number(width.toFixed(2));
    }
  }, []);

  const onResize = () => {
    setShouldTransistion(false);
    const carouselElement = carouselRef.current;
    const carouselInnerElement = carouseInnerRef.current;

    if (carouselElement && carouselInnerElement) {
      const width = carouselElement.getBoundingClientRect().width;
      imageWidthValue.current = Number(width.toFixed(2));
    }

    setSliderOffset(activeIndex * -Number(imageWidthValue.current.toFixed(2)));
    toggleTransitionStyling(), getImageWidthValue();
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex]);

  const setIndexandOffset = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setSliderOffset(index * -imageWidthValue.current);
    },
    [activeIndex]
  );

  const clickPreviousImage = useCallback(() => {
    const newActiveIndex =
      activeIndex === 0 ? imageData.length - 1 : activeIndex - 1;
    setIndexandOffset(newActiveIndex);
  }, [activeIndex]);

  const clickNextImage = useCallback(() => {
    const newActiveIndex =
      activeIndex === imageData.length - 1 ? 0 : activeIndex + 1;

    setIndexandOffset(newActiveIndex);
  }, [activeIndex]);

  const enterSlider = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  }, []);

  const pressingSlider = useCallback((event: MouseEvent) => {
    setPressedState(true);

    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }

    setShouldTransistion(false);
    setStartXPos(event.clientX);
  }, []);

  const dragSlider = useCallback(
    (event: MouseEvent) => {
      if (!pressedState) return;
      const current = event.clientX;
      const newCurrentMouseX = current - startMouseX;
      const newSliderOffset =
        activeIndex * -imageWidthValue.current + newCurrentMouseX;

      let modifiedSliderOffset = newSliderOffset;

      if (newSliderOffset > 0) {
        modifiedSliderOffset = 0;
      } else if (
        newSliderOffset <
        (imageData.length - 1) * -imageWidthValue.current
      ) {
        modifiedSliderOffset =
          (imageData.length - 1) * -imageWidthValue.current;
      }

      setCurrentMouseX(newCurrentMouseX);
      setSliderOffset(modifiedSliderOffset);
    },
    [pressedState, activeIndex, imageWidthValue.current, startMouseX]
  );

  const releaseSlider = useCallback(
    (carouselElement?: HTMLDivElement | null) => {
      if (!pressedState) return;

      if (carouselElement) {
        carouselElement.style.cursor = "grab";
      }

      setPressedState(false);

      const newActiveIndex = Math.round(
        (activeIndex * -imageWidthValue.current + currentMouseX) /
          -imageWidthValue.current
      );

      const newSliderOffset = newActiveIndex * -imageWidthValue.current;

      setShouldTransistion(true);

      if (
        newSliderOffset > 0 ||
        newSliderOffset <= imageData.length * -imageWidthValue.current
      ) {
      } else {
        setSliderOffset(newSliderOffset);
        setActiveIndex(newActiveIndex);
        setIndexandOffset(newActiveIndex);
      }
    },
    [pressedState, activeIndex, imageWidthValue.current, currentMouseX]
  );

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        onMouseEnter={enterSlider}
        onMouseDown={(event) => pressingSlider(event)}
        onMouseMove={(event) => dragSlider(event)}
        onMouseUp={() => releaseSlider(carouselElement)}
        onMouseLeave={() => releaseSlider()}
        ref={carouselRef}
      >
        <ul
          ref={carouseInnerRef}
          className={`carousel__list ${
            shouldTransistion === true && "carousel__list--animation"
          } `}
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
      <M2ButtonsGroup styling="carousel__buttons-group ">
        <A4Button
          text={"PREV"}
          state={activeIndex === 0 ? "disabled" : "default"}
          onClick={() => clickPreviousImage()}
        />
        <A4Button
          text={"NEXT"}
          state={activeIndex === imageData.length - 1 ? "disabled" : "default"}
          onClick={() => clickNextImage()}
        />
      </M2ButtonsGroup>
    </div>
  );
};

export default Carousel;
