import React from "react";
import { Navigate } from "react-router-dom";

import { selectAuth } from "../../store/auth/authSlice";
import { useAppSelector } from "../../store/hooks";
import { ROUTE } from "../../util/constant";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const user = useAppSelector(selectAuth);

  if (!user?.value?.accessToken) {
    return <Navigate to={ROUTE.LOGIN} />;
  } else {
    return children as JSX.Element;
  }
};

const withProtection = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => (
    <ProtectedRoute>
      <WrappedComponent {...props} />
    </ProtectedRoute>
  );
};

export default withProtection;
