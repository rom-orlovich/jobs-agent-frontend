/**
 *
 * @param {(string|undefined)[]} classes an array of classes as string if they exist or undefined if they don't.
 * @returns {string} literal string that contains all the classes with spaces between them.
 */
export const classNameGenerator = (...classes: (string | undefined)[]) => {
  return `${classes.filter((el) => el).join(' ')}`;
};

/**
 * @param {string} words Words to capital their first letter.
 * @returns {string | undefined|null} Each words with capital first letter or undefined.
 */
export function capitalFirstLetter(words?: string | null): string | undefined | null {
  return words
    ? words
        ?.split(' ')
        .map((words) => words[0].toUpperCase() + words.slice(1))
        .join(' ')
    : words;
}
