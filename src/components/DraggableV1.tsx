import { useEffect, useRef, useState } from "react";

const Draggable = ({
  list,
  children,
  draggable,
  onDragStart,
  onDragEnd,
  onMove,
  onUpdate,
}: any) => {
  const [draggableElementId, setDraggableElementId] = useState(null);

  const childrenWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const childrenWrapperEle = childrenWrapper.current;
    if (!childrenWrapperEle) return;
    const elementBlocks =
      childrenWrapperEle.querySelectorAll<HTMLDivElement>(".element-block");
    console.log("elementBlocks", elementBlocks);

    elementBlocks.forEach((element) => {
      element.draggable = draggable;
      element.addEventListener("dragstart", handleDragStart);
      element.addEventListener("dragend", handleDragEnd);
      element.addEventListener("dragover", handleDragOver);
      element.addEventListener("drop", handleDrop);
    });

    // Cleanup function to remove event listeners
    return () => {
      elementBlocks.forEach((element) => {
        element.removeEventListener("dragstart", handleDragStart);
        element.removeEventListener("dragend", handleDragEnd);
        element.removeEventListener("dragover", handleDragOver);
        element.removeEventListener("drop", handleDrop);
      });
    };
  });
  // }, [children, onDragStart, onDragEnd, onMove]);

  const handleDragStart = (event: DragEvent) => {
    setDraggableElementId(event.target.id);
    if (onDragStart) onDragStart();
    event.dataTransfer.setData("text/plain", event?.target?.id);
  };

  const handleDragEnd = () => {
    if (onDragEnd) onDragEnd();
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onMove) onMove();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const targetElement = event.target;
    const targetElementId = targetElement.id;

    const draggableElementIndex = list.findIndex(
      (el: any) => el.id === draggableElementId
    );

    const targetElementIndex = list.findIndex(
      (el: any) => el.id === targetElementId
    );

    const updatedList = JSON.parse(JSON.stringify(list));

    updatedList.splice(draggableElementIndex, 1);
    updatedList.splice(targetElementIndex, 0, list[draggableElementIndex]);
    onUpdate(updatedList);
  };
  return <div ref={childrenWrapper}>{children}</div>;
};

export default Draggable;
