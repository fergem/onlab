/* eslint-disable import/prefer-default-export */
export const ArrayFunctions = {
  isLastElement<T>(array: T[] | undefined, element: T): boolean {
    if (!array) return false;
    if (array.length === 0) {
      // If the array is empty, there is no last element.
      return false;
    }

    const lastElement = array[array.length - 1];
    return element === lastElement;
  },
  findElementBefore<T>(array: T[] | undefined, knownElement: T): T | undefined {
    if (!array) return undefined;
    const index = array.indexOf(knownElement);

    if (index !== -1 && index > 0) {
      return array[index - 1];
    }

    return undefined;
  },
};
