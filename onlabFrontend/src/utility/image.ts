// eslint-disable-next-line import/prefer-default-export
export const ImageFunctions = {
  toDisplayImage(fallbackImage: string, image?: string) {
    if (image) {
      return `data:image/png;base64,${image}`;
    }
    return fallbackImage;
  },
};
