import { createContext } from "react";

export const userInfo = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  day: "24",
  month: "Juin",
  year: "2000",
  otp: "",
  username: "",
  telephone: "",
};

export const UserContext = createContext(userInfo);
