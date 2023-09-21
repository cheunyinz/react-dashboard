import { useState, useRef, useEffect, RefObject } from "react";
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
  const [startXpos, setStartXPos] = useState(0);
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [sliderXPos, setSliderxPos] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const carouselElement = carouselRef.current;
      if (carouselElement) {
        const width = carouselElement.getBoundingClientRect().width;
        setImageWidthValue(Number(width.toFixed(2)));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevImage = () => {
    let newActiveIndex =
      activeIndex === 0 ? imageData.length - 1 : activeIndex - 1;
    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
    console.log(activeIndex, "THE PREV INDEX");
  };

  const nextImage = () => {
    let newActiveIndex =
      activeIndex === imageData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
    console.log(activeIndex, "THE NEXT INDEX");
  };

  const enterSlider = () => {
    // setPressedState(true);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  };
  const pressingSlider = (e: any, outerCarousel: any, innerCarousel: any) => {
    setPressedState(true);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }

    setStartXPos(e.clientX);
    console.log(startXpos, " startpoint");
  };

  const dragSlider = (e: any, outerCarousel: any) => {
    if (pressedState === false) return;

    let current = e.clientX;

    setCurrentMouseX(current - startXpos);

    setExtraOffset(activeIndex * imageWidthValue + currentMouseX);
  };

  const unpressSlider = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * imageWidthValue + currentMouseX) / -imageWidthValue
    );
    setExtraOffset(0);
    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
    console.log(newActiveIndex);
  };

  const exitSlider = () => {
    if (pressedState === false) return;
    setPressedState(false);
    const newActiveIndex = Math.round(
      (activeIndex * imageWidthValue + currentMouseX) / -imageWidthValue
    );
    setExtraOffset(0);
    setActiveIndex(newActiveIndex);
    setOffset(newActiveIndex * -imageWidthValue);
  };

  const buttons: M2ButtonsGroupProps["buttons"] = [
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
  ];
  console.log(activeIndex, "THE ACTIVE INDEX");
  return (
    <div className="carousel">
      <div
        className="carousel__container"
        onMouseEnter={enterSlider}
        onMouseDown={(e) =>
          pressingSlider(e, carouselRef.current, carouseInnerRef.current)
        }
        onMouseMove={(e) => dragSlider(e, carouselRef.current)}
        onMouseUp={unpressSlider}
        onMouseLeave={exitSlider}
        ref={carouselRef}
      >
        <ul
          ref={carouseInnerRef}
          className="carousel__list"
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
      <M2ButtonsGroup buttons={buttons} />
      <p className="currentPos">{currentMouseX}</p>
    </div>
  );
};

export default Carousel;
