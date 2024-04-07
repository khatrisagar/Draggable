export interface DraggableItem {
  id: string;
  type: string;
  value: string;
}
export interface DraggableProps {
  list: DraggableItem[];
  children: React.ReactNode;
  draggable: boolean;
  draggableClass: string;
  onDragStart?: (event: CustomExtendedEvent) => void;
  onDragEnd?: () => void;
  onMove?: (event: CustomExtendedEvent) => void;
  onUpdate: (updatedList: DraggableItem[]) => void;
}

export interface customEventDetails {
  originalEvent?: DragEvent<HTMLDivElement>;
  from?: HTMLDivElement | null;
  to?: HTMLDivElement | null;
  currentIndex?: number | null;
  currentElementId?: string | null;
  droppableIndex?: number | null;
  droppableElementId?: string | null;
  dropZoneIndex?: number | null;
}
export interface CustomExtendedEvent extends CustomEvent, customEventDetails {}

export interface DispatchEventInfo extends customEventDetails {
  name: string;
  el: HTMLElement;
}

export interface StartElementInfo {
  id: string | null;
  index: number | null;
}
