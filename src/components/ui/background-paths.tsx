import { createPortal } from "react-dom";

export function BackgroundPaths() {
  return createPortal(
    <div className="bg-mesh">
      <div className="bg-mesh__blob bg-mesh__blob--1" />
      <div className="bg-mesh__blob bg-mesh__blob--2" />
      <div className="bg-mesh__blob bg-mesh__blob--3" />
    </div>,
    document.body
  );
}
