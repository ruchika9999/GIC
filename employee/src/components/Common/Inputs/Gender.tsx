import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

import { FieldConstant, genders } from "../../../util/constant";
import { EmployeeDetailsType } from "../../../util/type";

const Gender = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<EmployeeDetailsType>();

  const isError = errors[FieldConstant.GENDER];

  return (
    <Controller
      control={control}
      name={FieldConstant.GENDER}
      render={({ field: { name, onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl error={Boolean(error)} variant="standard">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name={name}
            >
              {genders.map((option, index) => (
                <FormControlLabel
                  key={index}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        color: isError ? "error.main" : "",
                      }}
                    />
                  }
                  label={option.label}
                  id={option.label}
                  checked={
                    option.value ===
                    watch(FieldConstant.GENDER).toLocaleLowerCase()
                  }
                />
              ))}
            </RadioGroup>
            <FormHelperText sx={{ ml: 2 }}>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default Gender;
