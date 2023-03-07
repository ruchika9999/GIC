import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { FieldConstant } from "../../../util/constant";
import { EmployeeDetailsType, UserLoginType } from "../../../util/type";

const Email = () => {
  const { control } = useFormContext<EmployeeDetailsType | UserLoginType>();

  return (
    <Controller
      control={control}
      name={FieldConstant.EMAIL}
      render={({
        field: { name, onBlur, value, onChange },
        fieldState: { error },
      }) => (
        <TextField
          id={name}
          label="Email Address"
          variant="outlined"
          onChange={(e) => onChange(e)}
          value={value}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  );
};

export default Email;
