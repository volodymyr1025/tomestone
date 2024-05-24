import { useDrag } from "react-dnd";
import { useRef } from "react";
import { DraggableItemType } from "../../types/types";
import { getFullImageUrl } from "../../utils/utils";
import useContainerWidth from "../../hooks/useContainerWidth";

type MoveItemFunction = (id: string, x: number, y: number) => void;

interface IconItemProps {
  item: DraggableItemType;
  moveItem: MoveItemFunction;
}

const IconItem: React.FC<IconItemProps> = ({ item, moveItem }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerWidth = useContainerWidth();

  const [, drag] = useDrag({
    type: "symbol",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.position.x + delta.x);
        const y = Math.round(item.position.y + delta.y);
        moveItem(draggedItem.symbol._id, x, y);
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
    </div>
  );
};

export default IconItem;
