import { DragEvent, useEffect, useRef, useState } from "react";
import { handleDispatchEvent } from "@/utils";
import { DraggableProps, StartElementInfo } from "@/types";

const Draggable = ({
  list,
  children,
  draggable,
  draggableClass,
  onDragStart,
  onDragEnd,
  onMove,
  onUpdate,
}: DraggableProps) => {
  const childrenWrapper = useRef<HTMLDivElement>(null);

  const [draggableElementInfo, setDraggableElementInfo] =
    useState<StartElementInfo>({
      id: null,
      index: null,
    });

  useEffect(() => {
    const childrenWrapperEle = childrenWrapper.current;
    if (!childrenWrapperEle) return;
    const elementBlocks =
      childrenWrapperEle.querySelectorAll<HTMLDivElement>(draggableClass);

    // eslint-disable-next-line
    elementBlocks.forEach((element: any) => {
      element.draggable = draggable;
      element.addEventListener("dragstart", handleDragStart);
      element.addEventListener("dragend", handleDragEnd);
      element.addEventListener("dragover", handleDragOver);
      element.addEventListener("drop", handleDrop);
    });

    return () => {
      // eslint-disable-next-line
      elementBlocks.forEach((element: any) => {
        element.removeEventListener("dragstart", handleDragStart);
        element.removeEventListener("dragend", handleDragEnd);
        element.removeEventListener("dragover", handleDragOver);
        element.removeEventListener("drop", handleDrop);
      });
    };
  });

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    const targetElement = event.currentTarget;
    event.dataTransfer.setData("draggableElementId", targetElement?.id);

    const draggableElementIndex = list.findIndex(
      (el) => el.id == targetElement?.id
    );

    setDraggableElementInfo({
      index: draggableElementIndex,
      ...list[draggableElementIndex],
    });
    const customEvent = handleDispatchEvent({
      name: "startdrag",
      el: event.currentTarget,
      originalEvent: event,
    });
    if (onDragStart) onDragStart(customEvent);
  };

  const handleDragEnd = () => {
    if (onDragEnd) onDragEnd();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppableElement = event.currentTarget;
    const droppableElementId = droppableElement.id;

    const droppableIndex = list.findIndex((el) => el.id === droppableElementId);

    const customEvent = handleDispatchEvent({
      name: "move",
      el: event.currentTarget,
      originalEvent: event,
      currentIndex: draggableElementInfo.index,
      droppableElementId: droppableElementId,
      droppableIndex: droppableIndex,
      dropZoneIndex:
        draggableElementInfo.index !== null &&
        draggableElementInfo.index >= droppableIndex
          ? droppableIndex
          : droppableIndex + 1,
    });

    if (onMove) onMove(customEvent);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const draggableElementId = event.dataTransfer.getData("draggableElementId");
    event.preventDefault();
    event.stopPropagation();
    const targetElement = event.currentTarget;
    const targetElementId = targetElement.id;

    if (draggableElementId !== targetElementId) {
      const draggableElementIndex = list.findIndex(
        (el) => el.id === draggableElementId
      );

      const targetElementIndex = list.findIndex(
        (el) => el.id === targetElementId
      );

      const updatedList = JSON.parse(JSON.stringify(list));

      updatedList.splice(draggableElementIndex, 1);
      updatedList.splice(targetElementIndex, 0, list[draggableElementIndex]);
      onUpdate(updatedList);
    }
    setDraggableElementInfo({ id: null, index: null });
  };

  return <div ref={childrenWrapper}>{children}</div>;
};

export default Draggable;
