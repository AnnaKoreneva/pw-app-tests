import { randomInt } from "crypto";

var dateTemp = new Date();

export const getRandomDate = (numberOfDays: number): string[] => {
  dateTemp.setDate(dateTemp.getDate() + numberOfDays);
  const date = dateTemp.getDate().toString();
  const monthShort = dateTemp.toLocaleString('en-US', { month: "short" });
  const monthLong = dateTemp.toLocaleString("en-US", { month: "long" });
  const year = dateTemp.getFullYear()
  const fullDate = `${monthShort} ${date}, ${year}`;
  const datePickerHeaderValue = `${monthLong} ${year}`;
  return [date, fullDate, datePickerHeaderValue];
};

export const getRandomStartEndNumbers = (): number[] => {
  const startNumber = randomInt(0, 256);
  const endNumber = startNumber + randomInt(0, 256);
  return [startNumber, endNumber]
};
