// eslint-disable-next-line import/prefer-default-export
export const DateFunctions = {
  isTimeDifferenceGreaterThan30Minutes(date1: Date, date2: Date): boolean {
    const timeDifference = date2.getTime() - date1.getTime();
    const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

    return timeDifference > thirtyMinutesInMilliseconds;
  },
};
