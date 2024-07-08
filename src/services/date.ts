import { randomInt } from "crypto"
var dateTemp = new Date();

export const getRandomDate = (): string[] => { 
    dateTemp.setDate(dateTemp.getDate() + randomInt(0, 512)); //
    const date = dateTemp.getDate().toString();

    const monthShort = dateTemp.toLocaleString("en-US", { month: "short" });
    const monthLong = dateTemp.toLocaleString("en-US", { month: "long" });
    const year = dateTemp.getFullYear()

    const fullDate = `${monthShort} ${date}, ${year}`
    const datePickerHeaderValue = ` ${monthLong} ${year} `;
    return [date, fullDate, datePickerHeaderValue];
}

