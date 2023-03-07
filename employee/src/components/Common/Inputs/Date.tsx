import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { useState, useMemo } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError } from "@mui/x-date-pickers";
import { FormControl, FormHelperText } from "@mui/material";

import { FieldConstant } from "../../../util/constant";
import { EmployeeDetailsType } from "../../../util/type";

const Date = () => {
  const { control } = useFormContext<EmployeeDetailsType>();
  const [error, setError] = useState<DateValidationError | null>(null);

  const yesterday = dayjs().subtract(1, "day");


  const errorMessage = useMemo(() => {
    return error ? "Your date is not valid" : "";
  }, [error]);

  return (
    <Controller
      control={control}
      name={FieldConstant.JOINED_DATE}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={Boolean(error)} variant="standard" fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem>
                <DatePicker
                  maxDate={yesterday}
                  views={["year", "month", "day"]}
                  label="Join Date"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  disableFuture
                  onError={(newError) => setError(newError)}
                  value={value}
                />
              </DemoItem>
            </DemoContainer>
            <FormHelperText sx={{ ml: 2, color: "error.main" }}>
              {error?.message || errorMessage}
            </FormHelperText>
          </LocalizationProvider>
        </FormControl>
      )}
    />
  );
};

export default Date;
