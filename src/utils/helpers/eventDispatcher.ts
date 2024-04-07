import { CustomExtendedEvent, DispatchEventInfo } from "@/types";

export const handleDispatchEvent = (eventInfo: DispatchEventInfo) => {
  const {
    name,
    el,
    originalEvent,
    from,
    to,
    droppableIndex,
    currentIndex,
    droppableElementId,
    currentElementId,
    dropZoneIndex,
  } = eventInfo;
  const customEvent: CustomExtendedEvent = new CustomEvent(name);
  customEvent.originalEvent = originalEvent;
  customEvent.from = from ?? null;
  customEvent.to = to ?? null;
  customEvent.currentIndex = currentIndex ?? null;
  customEvent.droppableIndex = droppableIndex ?? null;
  customEvent.droppableElementId = droppableElementId ?? null;
  customEvent.currentElementId = currentElementId ?? null;
  customEvent.dropZoneIndex = dropZoneIndex ?? null;
  el.dispatchEvent(customEvent);
  return customEvent;
};
