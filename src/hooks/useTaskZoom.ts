
import { useState } from "react";

export function useTaskZoom() {
  const [zoom, setZoom] = useState(1);

  function zoomIn() {
    setZoom((z) => Math.min(z + 0.25, 2));
  }

  function zoomOut() {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  }

  return { zoom, zoomIn, zoomOut };
}
