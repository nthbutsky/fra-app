import React, { useState, useEffect, useRef } from "react";

import clsx from "clsx";

export enum ETextCarouselDirection {
  UP = "up",
  DOWN = "down",
}

export default function TextCarousel({
  itemList,
  containerHeight,
  animationInterval,
  animationDuration,
  animationDirection,
  itemClass,
}: {
  itemList: string[];
  containerHeight: number;
  animationInterval: number;
  animationDuration: number;
  animationDirection: ETextCarouselDirection;
  itemClass?: string;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const elements = useRef<HTMLCollection | null>(null);
  const elementLength = useRef<number>(0);
  const elementStartPosition = useRef<number>(0);
  const elementEndPosition = useRef<number>(containerHeight);
  const elementCurrentIndex = useRef<number>(0);
  const elementDirection = useRef<ETextCarouselDirection>(animationDirection);
  const animationIntervalId = useRef<ReturnType<typeof setInterval>>();

  const move = (direction: ETextCarouselDirection) => {
    let start: string;
    let end: string;

    if (direction === ETextCarouselDirection.UP) {
      start =
        elementStartPosition.current === 0
          ? "0px"
          : `-${elementStartPosition.current}px`;
      end = `-${elementEndPosition.current}px`;
    } else {
      start = `-${elementStartPosition.current}px`;
      end =
        elementEndPosition.current === 0
          ? "0px"
          : `-${elementEndPosition.current}px`;
    }

    if (elementRef.current) {
      elementRef.current.animate(
        [
          {
            transform: `translateY(${start})`,
          },
          {
            transform: `translateY(${end})`,
          },
        ],
        {
          duration: animationDuration,
          iterations: 1,
          fill: "forwards",
          easing: "ease-in-out",
        },
      );
    }
  };

  const shiftContainer = (direction: ETextCarouselDirection) => {
    if (direction === ETextCarouselDirection.UP) {
      move(ETextCarouselDirection.UP);

      if (elementCurrentIndex.current === elementLength.current - 1) {
        elementCurrentIndex.current = 0;
        elementStartPosition.current = 0;
        elementEndPosition.current = containerHeight;
      } else {
        elementCurrentIndex.current += 1;
        elementStartPosition.current += containerHeight;
        elementEndPosition.current += containerHeight;
      }
    } else {
      move(ETextCarouselDirection.DOWN);

      if (elementCurrentIndex.current === 0) {
        elementCurrentIndex.current = elementLength.current - 1;
        elementStartPosition.current = elementLength.current * containerHeight;
        elementEndPosition.current =
          elementStartPosition.current - containerHeight;
      } else {
        elementCurrentIndex.current -= 1;
        elementStartPosition.current -= containerHeight;
        elementEndPosition.current -= containerHeight;
      }
    }
  };

  const initCarousel = (itemList: string[]) => {
    if (itemList.length < 2) {
      return;
    }
    elements.current = elementRef.current!.children;
    elementLength.current = itemList.length;
    const firstCode = elements.current[0];
    const cloneFirst = firstCode.cloneNode(true);
    elementRef.current!.appendChild(cloneFirst);

    if (elementDirection.current === ETextCarouselDirection.DOWN) {
      elementCurrentIndex.current = elementLength.current - 1;
      elementStartPosition.current = elementLength.current * containerHeight;
      elementEndPosition.current =
        elementStartPosition.current - containerHeight;
    }

    animationIntervalId.current = setInterval(() => {
      shiftContainer(elementDirection.current);
    }, animationInterval);
  };

  useEffect(() => {
    initCarousel(itemList);
    return () => clearInterval(animationIntervalId.current);
  }, [itemList]);

  return (
    <div className="overflow-hidden" style={{ height: `${containerHeight}px` }}>
      <div ref={elementRef}>
        {itemList.map((item, index) => (
          <div className="flex flex-col">
            <div
              key={index}
              className={clsx(
                "w-full overflow-hidden text-ellipsis whitespace-nowrap",
                itemClass,
              )}
              style={{ height: `${containerHeight}px` }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
