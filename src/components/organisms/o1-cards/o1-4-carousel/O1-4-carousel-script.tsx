import { useState, useRef, useEffect, MouseEvent, useCallback } from "react";
import { useMount } from "react-use";
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
  const [shouldTransistion, setShouldTransistion] = useState(true);
  const carouselElement = carouselRef.current;

  useMount(() => {
    // setTimeout(() => {
    //   getImageWidthValue();
    // }, 0);
    getImageWidthValue();
  });

  const toggleTransitionStyling = debounce(() => {
    setShouldTransistion(true);
  }, 200);

  const handleResize = useCallback(() => {
    setShouldTransistion(false);
  }, [imageWidthValue]);

  const getImageWidthValue = useCallback(() => {
    console.log(imageWidthValue, "GET IMAGE WIDTH VALUE");
    const carouselElement = carouselRef.current;
    const carouselInnerElement = carouseInnerRef.current;
    if (carouselElement && carouselInnerElement) {
      const width = carouselElement.getBoundingClientRect().width;
      setImageWidthValue(Number(width.toFixed(2)));
    }
  }, [activeIndex]);

  const triggerSlideshow = useCallback(() => {
    console.log(imageWidthValue, "TRIGGER SLIDERSHOW");
    setSliderOffset(activeIndex * -Number(imageWidthValue.toFixed(2)));
  }, [imageWidthValue, activeIndex]);

  useEffect(() => {
    const onResize = () => {
      handleResize(),
        toggleTransitionStyling(),
        getImageWidthValue(),
        triggerSlideshow();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, imageWidthValue]);

  const setIndexandOffset = useCallback(
    (index: number, offset: number) => {
      setActiveIndex(index);
      setSliderOffset(offset);
    },
    [activeIndex]
  );

  const clickPreviousImage = () => {
    let newActiveIndex =
      activeIndex === 0 ? imageData.length - 1 : activeIndex - 1;
    setIndexandOffset(newActiveIndex, newActiveIndex * -imageWidthValue);
  };

  const clickNextImage = () => {
    let newActiveIndex =
      activeIndex === imageData.length - 1 ? 0 : activeIndex + 1;
    setIndexandOffset(newActiveIndex, newActiveIndex * -imageWidthValue);
  };

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

  const dragSlider = (event: MouseEvent) => {
    if (!pressedState) return;
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
  const releaseSlider = (carouselElement?: HTMLDivElement | null) => {
    if (!pressedState) return;
    if (carouselElement) {
      carouselElement.style.cursor = "grab";
    }
    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * -imageWidthValue + currentMouseX) / -imageWidthValue
    );

    let newSliderOffset = newActiveIndex * -imageWidthValue + 0;

    setShouldTransistion(true);

    if (
      newSliderOffset > 0 ||
      newSliderOffset <= imageData.length * -imageWidthValue
    ) {
    } else {
      setSliderOffset(newSliderOffset);
      setActiveIndex(newActiveIndex);
      setIndexandOffset(newActiveIndex, newSliderOffset);
    }
  };

  const prevButtonState = activeIndex === 0 ? "disabled" : "default";

  const nextButtonState =
    activeIndex === imageData.length - 1 ? "disabled" : "default";

  const transistionStyling =
    shouldTransistion === true ? "carousel__list--animation" : "";

  const buttonsAndStyling: M2ButtonsGroupProps = {
    buttons: [
      {
        text: "PREV",
        state: prevButtonState,
        onClick: () => clickPreviousImage(),
      },
      {
        text: "NEXT",
        state: nextButtonState,
        onClick: () => clickNextImage(),
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
        onMouseUp={() => releaseSlider(carouselElement)}
        onMouseLeave={() => releaseSlider()}
        ref={carouselRef}
      >
        <ul
          ref={carouseInnerRef}
          className={`carousel__list ${transistionStyling} `}
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
