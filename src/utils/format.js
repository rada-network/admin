import { format, parseISO, getUnixTime, fromUnixTime as fromUnixTimeCore } from "date-fns";
import { formatEther as formatEtherCore } from "@ethersproject/units";

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
    if (date) {
      return getUnixTime(date);
    }

    return Date.now() / 1000;
  } catch (error) {}
};

const fromUnixTime = (unixTime) => {
  if (unixTime > 0) {
    return fromUnixTimeCore(unixTime);
  }

  return "";
};

const formatEther = (value) => {
  const v = formatEtherCore(value);

  if (v < 0.0000000000001) {
    return 0;
  }

  return v;
};

const formatNumber = (value) => {
  if (value) {
    return new Intl.NumberFormat().format(value);
  }
  return 0;
};
export { formatDate, convertUnix, fromUnixTime, formatEther, formatNumber };
