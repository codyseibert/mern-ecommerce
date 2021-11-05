import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";

export const LogoutPage = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setUser({});
    history.push("/");
  }, []);

  return <div></div>;
};
