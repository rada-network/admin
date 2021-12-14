import { DateTimePicker } from "@mui/lab";

export default function DatePicker(props) {
  console.log("DatePicker render...");

  return <DateTimePicker {...props} inputFormat="dd/MM/yyyy hh:mm a" />;
}
