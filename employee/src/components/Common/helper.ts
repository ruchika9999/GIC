export const subHeader = {
    component: "span",
    color: "text.primary",
    fontWeight: "bold",
    sx: { display: "inline" },
  };

  export const subDetails = {
    component: "span",
    color: "text.secondary",
    fontWeight: "bold",
    sx: { display: "inline" },
    marginLeft: 1,
  };


  export const displayMenuItem = (isVisible: boolean) =>
  isVisible ? "block" : "none";