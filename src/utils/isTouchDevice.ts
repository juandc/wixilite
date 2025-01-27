export const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

export const initiallyIsTouchDevice = isTouchDevice();
