import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableItemType } from "../../types/types";
import { getFullImageUrl } from "../../utils/utils";
import useContainerWidth from "../../hooks/useContainerWidth";

type MoveItemFunction = (id: string, x: number, y: number) => void;

const PlateItem = ({
  item,
  moveItem,
  firstName,
  lastName,
  dateOnPlate,
  birthdayOnPlate,
}: {
  item: DraggableItemType;
  moveItem: MoveItemFunction;
  firstName: string;
  lastName: string;
  dateOnPlate: string;
  birthdayOnPlate: string;
}) => {
  const containerWidth = useContainerWidth();
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: "symbol",
    item: item,
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.position.x + delta.x);
        const y = Math.round(item.position.y + delta.y);
        moveItem(item.symbol._id, x, y);
      }
    },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: item.position.x,
        top: item.position.y,
        cursor: "move",
      }}
    >
      <img
        src={getFullImageUrl(item.symbol.url)}
        alt={`Dropped ${item.symbol.alt}`}
        style={{
          width: `${(item.symbol.width * containerWidth) / 550}px`,
          height: "auto",
        }}
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
  );
};

export default PlateItem;
