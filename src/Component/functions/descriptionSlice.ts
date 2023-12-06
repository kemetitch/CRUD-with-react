/**
 *
 * @param {string} txt - The text you want to slice
 * @param {number} max - The maximum number of characters to display
 * @returns text after slicing
 */
export const descriptionSlice = (txt: string, max: number = 80) => {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
};
