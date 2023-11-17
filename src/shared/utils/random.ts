export const stringToColor = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    // eslint-disable-next-line unicorn/prefer-code-point
    hash = char.charCodeAt(0) + ((hash << 3) - hash);
  });
  let color = "#";
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line unicorn/number-literal-case
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};
