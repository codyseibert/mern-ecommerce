import { useContext } from "react";
import { UserContext } from "../App";

export const useIsLoggedIn = () => {
  const [user] = useContext(UserContext);
  return !!user.token;
};
