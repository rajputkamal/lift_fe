const GRACE_PERIOD_HOURS = 3;
export const GRACE_PERIOD_MS = GRACE_PERIOD_HOURS * 60 * 60 * 1000;

export const maskNumber = (number) => {
  const str = number.toString();
  if (str.length <= 4) return str;

  const last3 = str.slice(-3);
  const masked = "*".repeat(str.length - 5) + last3;
  return `+91${masked}`;
};

export const capitalizeWords = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
