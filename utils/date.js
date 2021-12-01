import * as dayjs from "dayjs";

const format = "MM-DD-YYYY HH:mm";
const formatDate = (date) => {
  return dayjs(date, format);
};

export { formatDate };
