export const isTouchDevice = () => matchMedia("(pointer: coarse)").matches;

export const initiallyIsTouchDevice = isTouchDevice();
