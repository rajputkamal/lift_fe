export const maskNumber = (number) => {
  const str = number.toString();
  if (str.length <= 4) return str;

  const last3 = str.slice(-3);
  const masked = "*".repeat(str.length - 5) + last3;
  return `+91${masked}`;
};
