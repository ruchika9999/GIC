import { Alert } from "@mui/material";

type AlertProps = {
  message: string;
  display: boolean;
  fullWith?: boolean;
};

const useAlerts = () => {
  const displayMissingField = (props: AlertProps) => {
    const { message, display, fullWith } = props;
    return display ? (
      <Alert
        sx={fullWith ? { width: "100%" } : { ml: 1, mr: 1 }}
        severity="error"
      >
        {message}
      </Alert>
    ) : null;
  };

  // more alert types

  return { displayMissingField };
};

export default useAlerts;
