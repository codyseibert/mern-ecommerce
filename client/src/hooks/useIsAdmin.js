import { useContext } from "react";
import { UserContext } from "../App";

export const useIsAdmin = () => {
  const [user] = useContext(UserContext);
  console.log("user", user);
  return user.user?.role === "admin";
};
