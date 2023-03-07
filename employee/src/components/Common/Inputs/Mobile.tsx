import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { CharacterLimit, FieldConstant } from "../../../util/constant";
import { EmployeeDetailsType } from "../../../util/type";

const Mobile = () => {
  const { control } = useFormContext<EmployeeDetailsType>();

  const helperText = (errorMessage: string | undefined) =>
    errorMessage ?? "Mobile Number format should be 65835491";

  return (
    <Controller
      control={control}
      name={FieldConstant.MOBILE}
      render={({
        field: { name, onBlur, value, onChange },
        fieldState: { error },
      }) => (
        <TextField
          sx={{ mt: 2 }}
          id={name}
          label="Mobile Number"
          variant="outlined"
          onChange={(e) => {
            if (
              (e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 8))
            ) {
              onChange(e);
            }
          }}
          value={value}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={helperText(error?.message)}
          fullWidth
          type="number"
          inputProps={{
            maxLength: CharacterLimit.MOBILE_CHARACTER_LIMIT,
          }}
        />
      )}
    />
  );
};

export default Mobile;
