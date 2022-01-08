import DatePicker from "components/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const formGenerator = (formFields, formState, handleOnchange, addView = false) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    {formFields.map((field, i) =>
      addView && !field.addView ? (
        ""
      ) : (
        <Grid item xs={field.size ? field.size : "6"} key={i}>
          {renderField(field, formState, handleOnchange)}
        </Grid>
      )
    )}
  </LocalizationProvider>
);

const renderField = (field, formState, handleOnchange, addView) => {
  switch (field.type) {
    case "date":
      return (
        <DatePicker
          label={field.label}
          value={formState[field.name]}
          onChange={(value) => handleOnchange({ target: { name: field.name, value: value } })}
          renderInput={(params) => <TextField {...params} />}
        />
      );

    case "bool":
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name={field.name}
            label={field.label}
            value={formState[field.name]}
            onChange={handleOnchange}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      );

    default:
      return (
        <TextField
          name={field.name}
          label={field.label}
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={formState[field.name]}
          onChange={handleOnchange}
        />
      );
  }
};

export default formGenerator;
