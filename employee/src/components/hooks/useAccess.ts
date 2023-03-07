import { selectAuth } from "../../store/auth/authSlice";
import { Permission } from "../../util/constant";
import { useAppSelector } from "./../../store/hooks";

const useAccess = () => {
  const user = useAppSelector(selectAuth);

  const haveAccess = (permissionType: Permission) =>
    user.userProfile?.roles?.some((access) => access === permissionType) || false;

  return haveAccess;
};

export default useAccess;
