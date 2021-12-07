import * as dayjs from "dayjs";

const format = "MM-DD-YYYY HH:mm";
const formatDate = (date) => {
  return dayjs(date, format).toString();
};

const formatAddress = (value) => `${value.substring(0, 4)}...${value.slice(-4)}`;

export { formatDate, formatAddress };
