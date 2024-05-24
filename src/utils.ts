function isTouchDevice() {
  const hasTouchPoints = navigator.maxTouchPoints > 0;

  const hasTouchEvent =
    "ontouchstart" in window || "ontouchstart" in document.documentElement;

  const hasPointerEvent =
    window.PointerEvent &&
    "maxTouchPoints" in navigator &&
    navigator.maxTouchPoints > 0;

  return hasTouchPoints || hasTouchEvent || hasPointerEvent;
}
