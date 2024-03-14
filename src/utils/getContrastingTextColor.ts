export function getContrastingTextColor(t: string) {
  "#" === t.charAt(0) && (t = t.substr(1));
  return (0.299 * parseInt(t.substr(0, 2), 16) +
    0.587 * parseInt(t.substr(2, 2), 16) +
    0.114 * parseInt(t.substr(4, 2), 16)) /
    255 >
    0.5
    ? "black"
    : "white";
}
