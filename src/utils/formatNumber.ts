export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).toString() + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).toString() + "K";
  } else {
    return num.toString();
  }
}

export function convertToFloat(integer: number) {
  const floatValue = (integer)?.toFixed(2);
  return floatValue;
}


