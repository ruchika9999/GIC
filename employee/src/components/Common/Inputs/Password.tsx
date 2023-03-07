import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { FieldConstant } from "../../../util/constant";
import { UserLoginType } from "../../../util/type";

const Password = () => {
  const { control } = useFormContext<UserLoginType>();

  return (
    <Controller
      control={control}
      name={FieldConstant.PASSWORD}
      render={({
        field: { name, onBlur, value, onChange },
        fieldState: { error },
      }) => (
        <TextField
          id={name}
          label={FieldConstant.PASSWORD}
          variant="outlined"
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur()}
          value={value}
          error={Boolean(error)}
          helperText={error?.message}
          fullWidth
          type="password"
        />
      )}
    />
  );
};

export default Password;
