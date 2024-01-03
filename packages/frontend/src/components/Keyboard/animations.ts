import { getKeyButtonId } from "./common";

const pressKeyframes = [
  { transform: "scale(1)" },
  { transform: "scale(0.95)" },
  { transform: "scale(1)" },
];

export function animateKeyButton(char: string) {
  const el = document.getElementById(getKeyButtonId(char));

  if (el) {
    el.animate(pressKeyframes, { duration: 100, iterations: 1 });
  }
}
