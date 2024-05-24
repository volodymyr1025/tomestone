import React, { useEffect, useRef, useState } from "react";
import { DraggableItemType, StoneType } from "../types/types";
import { getFullImageUrl } from "../utils/utils";
import useContainerWidth from "../hooks/useContainerWidth";

interface ProductProps {
  selectedStone: StoneType | null;
  items: DraggableItemType[] | null;
  firstName: string | null;
  lastName: string | null;
  dateOnPlate: string | null;
  birthdayOnPlate: string | null;
}

const Product: React.FC<ProductProps> = ({
  selectedStone,
  items,
  firstName,
  lastName,
  dateOnPlate,
  birthdayOnPlate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stoneRef = useRef<HTMLImageElement>(null);
  const [stoneStyle, setStoneStyle] = useState({});
  const containerWidth = useContainerWidth();

  const calculateStyles = () => {
    if (stoneRef.current) {
      const stoneHeight =
        ((selectedStone?.height ? selectedStone?.height : 0) * containerWidth) /
        55;
      const stoneWidth =
        ((selectedStone?.width ? selectedStone?.width : 0) * containerWidth) /
        55;

      if (stoneHeight > stoneWidth) {
        setStoneStyle({
          height: `${stoneHeight}px`,
          width: "auto",
          position: "absolute",
          bottom: `${(containerWidth * 8) / 55}px`,
          left: "50%",
          transform: "translateX(-50%)",
        });
      } else {
        setStoneStyle({
          width: `${stoneWidth}px`,
          height: "auto",
          position: "absolute",
          bottom: `${(containerWidth * 8) / 55}px`,
          left: "50%",
          transform: "translateX(-50%)",
        });
      }
    }
  };

  useEffect(() => {
    calculateStyles();
    window.addEventListener("resize", calculateStyles);

    return () => {
      window.removeEventListener("resize", calculateStyles);
    };
  }, [selectedStone, containerWidth]);

  return (
    <div className="relative dropArea-size text-center" ref={containerRef}>
      <div
        style={{
          position: "relative",
          width: `${containerWidth}px`,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <img
          src="/grave-background.png"
          style={{ width: "100%", height: "100%" }}
        />
        <img
          src="/base-stone.png"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${(containerWidth * 8) / 55}px`,
          }}
        />
        <img
          src="/grave-rose.png"
          style={{
            position: "absolute",
            bottom: `${(57 / 512) * containerWidth}px`,
            left: "50%",
            width: `${(180 / 512) * containerWidth}px`,
            height: "auto",
            zIndex: "10",
          }}
        />
        <img
          src={getFullImageUrl(selectedStone ? selectedStone.url.frontUrl : "")}
          alt={selectedStone?.alt}
          ref={stoneRef}
          style={stoneStyle}
        />
      </div>
      {items?.map((item, index) =>
        item.symbol.type === 2 ? (
          <div
            key={index}
            style={{
              position: "absolute",
              left: window.innerWidth < 600 ? item.position.x / 2 : item.position.x,
              top: window.innerWidth < 600 ? item.position.y / 2 : item.position.y,
            }}
          >
            <img
              src={getFullImageUrl(item.symbol.url)}
              alt={`Dropped ${item.symbol.alt}`}
              style={{ width: "100px", height: "100px" }}
            />
            <div
              className="plate-text"
              style={{
                position: "absolute",
                width: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {firstName} {lastName}
              <br />
              {birthdayOnPlate}
              <br />
              {dateOnPlate}
            </div>
          </div>
        ) : (
          <div
            key={index}
            style={{
              position: "absolute",
              left: window.innerWidth < 600 ? item.position.x / 2 : item.position.x,
              top: window.innerWidth < 600 ? item.position.y / 2 : item.position.y,
            }}
          >
            <img
              src={getFullImageUrl(item.symbol.url)}
              alt={`Dropped ${item.symbol.type}`}
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Product;
