import { createContext } from "react";

export const screens = [
  {
    name: "RegisterScreen",
    screens: [
      "main_register",
      "second_register",
      "third_register",
      "fourth_register",
      "fifth_register",
    ],
  },
  {
    name: "LoginScreen",
    screens: [
      "main_login",
      "second_login",
      "third_login",
      "fourth_login",
      "fifth_login",
    ],
  },
];

export const RegisterContext = createContext(screens);
