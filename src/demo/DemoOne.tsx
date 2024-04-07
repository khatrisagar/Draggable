import Draggable from "@/components/Draggable";
import React, { useState } from "react";
import { CustomExtendedEvent, DraggableItem } from "../types";

const DemoOne = () => {
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([
    {
      id: "11",
      type: "text",
      value: "test 1",
    },
    {
      id: "22",
      type: "text",
      value: "test 2",
    },
    {
      id: "33",
      type: "text",
      value: "test 3",
    },
    {
      id: "44",
      type: "text",
      value: "test 4",
    },
    {
      id: "55",
      type: "text",
      value: "test 5",
    },
  ]);

  const [dropZoneIndex, setDropZoneINdex] = useState<number | null>(null);

  const onDragStart = (event: CustomExtendedEvent) => {
    console.log("drag start", event);
  };
  const onDragEnd = () => {
    console.log("drag end");
    setDropZoneINdex(null);
  };
  const onMove = (event: CustomExtendedEvent) => {
    setDropZoneINdex(event.dropZoneIndex ?? null);
  };

  const updateListItems = (updatedListItems: DraggableItem[]) => {
    setDraggableItems(updatedListItems);
  };

  return (
    <div>
      <Draggable
        list={draggableItems}
        onMove={onMove}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onUpdate={updateListItems}
        draggableClass=".element-block"
      >
        {draggableItems.map((item, index) => (
          <div key={item.id} style={{ position: "relative" }}>
            {dropZoneIndex === index && (
              <div
                className="drop-zone"
                style={{
                  borderBottom: "4px solid #2d5090a3",
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
              ></div>
            )}
            <div
              id={item.id}
              className="element-block"
              style={{ fontSize: "3rem" }}
            >
              {item.value}
            </div>
            {index === draggableItems.length - 1 &&
              dropZoneIndex === draggableItems.length && (
                <div
                  className="drop-zone"
                  style={{
                    borderBottom: "4px solid #2d5090a3",
                    position: "absolute",
                    left: 0,
                    right: 0,
                  }}
                ></div>
              )}
          </div>
        ))}
      </Draggable>
    </div>
  );
};

export default DemoOne;
