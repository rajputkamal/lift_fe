export const maskNumber = (number) => {
  const str = number.toString();
  if (str.length <= 4) return str;

  const last4 = str.slice(-4);
  const masked = "X".repeat(str.length - 6) + last4;
  return `+91${masked}`;
};
