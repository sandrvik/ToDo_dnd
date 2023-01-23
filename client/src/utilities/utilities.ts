import { XYCoord } from 'react-dnd';

export default function getIsDraggedAfterMiddle(
  mousePosition: XYCoord,
  targetItem: HTMLElement,
) {
  const hoveredRect = targetItem.getBoundingClientRect();
  const middleOfItem = (hoveredRect.bottom - hoveredRect.top) / 2;
  const cursorPositionOnTarget = mousePosition.y - hoveredRect.top;
  return cursorPositionOnTarget! > middleOfItem!;
}
