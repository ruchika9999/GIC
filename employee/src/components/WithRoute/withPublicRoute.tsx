import React from "react";
import { Navigate } from "react-router-dom";

import { selectAuth } from "../../store/auth/authSlice";
import { useAppSelector } from "../../store/hooks";
import { ROUTE } from "../../util/constant";

const Route = ({ children }: React.PropsWithChildren) => {
  const user = useAppSelector(selectAuth);

  if (user?.value?.accessToken) {
    return <Navigate to={ROUTE.HOME} />;
  } else {
    return children as JSX.Element;
  }
};

const withPublicRoute = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => (
    <Route>
      <WrappedComponent {...props} />
    </Route>
  );
};

export default withPublicRoute;
