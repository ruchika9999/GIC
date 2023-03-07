import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { CharacterLimit, FieldConstant } from "../../../util/constant";
import { EmployeeDetailsType } from "../../../util/type";

type NameTypes = {
  name: FieldConstant.FIRST_NAME | FieldConstant.LAST_NAME;
};

const UserName = (props: NameTypes) => {
  const { name } = props;
  const { control } = useFormContext<EmployeeDetailsType>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, onBlur, value, onChange },
        fieldState: { error },
      }) => (
        <TextField
          id={name}
          label={name === FieldConstant.FIRST_NAME ? "First Name" : "Last Name"}
          variant="outlined"
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur()}
          value={value}
          error={Boolean(error)}
          inputProps={{
            maxLength: CharacterLimit.NAME_CHARACTER_LIMIT,
          }}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  );
};

export default UserName;
