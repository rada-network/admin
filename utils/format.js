import { format, parseISO, getUnixTime, fromUnixTime as fromUnixTimeCore } from "date-fns";

const formatString = "dd-MM-yyyy HH:mm";

const formatDate = (date) => {
  try {
    let dt = date;
    if (!(date instanceof Date)) {
      dt = parseISO(date);
    }

    return `${format(dt, formatString)} GTM`;
  } catch (error) {
    return "Invalid format";
  }
};

const convertUnix = (date) => {
  try {
    return getUnixTime(date);
  } catch (error) {
    return "";
  }
};

const fromUnixTime = (unixTime) => {
  if (unixTime > 0) {
    return fromUnixTimeCore(unixTime);
  }

  return "";
};

const formatAddress = (value) => `${value.substring(0, 4)}...${value.slice(-4)}`;

export { formatDate, formatAddress, convertUnix, fromUnixTime };
