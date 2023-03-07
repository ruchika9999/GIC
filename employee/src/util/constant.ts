export enum ROUTE {
  LOGIN = "/login",
  HOME = "/home",
  BAD_ROUTE = "*",
  CHART = "/chart",
  DEFAULT = "/",
}

export enum BACK_BUTTON_NAME {
  BACK_TO_LOGIN = "Back To Login",
  BACK_TO_HOME = "Back To Home",
}

export enum FieldConstant {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  MOBILE = "mobile",
  EMAIL = "email",
  JOINED_DATE = "joinedDate",
  GENDER = "gender",
  PASSWORD = "password",
  ID = "_id",
}

export enum Space {
  ONE_AND_HALF = 1.5,
  TWO = 2,
  THREE = 3,
  SIX = 6,
  TWELVE = 12,
}

export enum Name {
  FIRST = "first",
  LAST = "last",
}

export enum CharacterLimit {
  NAME_CHARACTER_LIMIT = 10,
  MOBILE_CHARACTER_LIMIT = 11,
}
export enum ModalStatus {
  ADD = "ADD USER",
  EDIT = "EDIT USER",
}

export enum Permission {
  ADMIN_CHART_ACCESS = "ADMIN_CHART_ACCESS",
}

export enum DisplayMessage {
  MISSING_FIELDS = "Something information is missing incorrect. Address the items highlighted  to continue.",
  FAILED_TO_LOGIN = "Login failed Please Try again!",
  NO_CHANGES = 'No changes meade'
}

export const DATE_FORMAT = "MM/DD/YYYY";

export const CHART_COLOR = "rgba(53, 162, 235, 0.5)";

export const containerStyle = {
  flexGrow: 1,
  p: 3,
  marginTop: 10,
  paddingLeft: 5,
  paddingRight: 5,
};
export const ListStyle = {
  width: "100%",
  bgcolor: "background.paper",
  border: "1px solid #ddd",
};

export const chartStyle = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

export const chatBox = { justifyContent: "space-between", display: "flex" };

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

export const labels = [
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];


export const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];