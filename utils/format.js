import { format, parseISO, getUnixTime, fromUnixTime as fromUnixTimeCore } from "date-fns";

const formatString = "dd-MM-yyyy HH:mm";

const formatDate = (date) => {
  try {
    let dt = date;
    if (!(date instanceof Date)) {
      dt = parseISO(date);
    }

    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

    return `${format(dtDateOnly, formatString)} GTM`;
  } catch (error) {
    return "Invalid format";
  }
};

const convertUnix = (date) => {
  try {
    const dtDateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

    return getUnixTime(dtDateOnly);
  } catch (error) {
    return "";
  }
};

const fromUnixTime = (unixTime) => {
  if (unixTime > 0) {
    return formatDate(fromUnixTimeCore(unixTime));
  }

  return "";
};

const formatAddress = (value) => `${value.substring(0, 4)}...${value.slice(-4)}`;

export { formatDate, formatAddress, convertUnix, fromUnixTime };
