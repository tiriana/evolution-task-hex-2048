import React from "react";
import GameController from "./GameController";
import { ConfigReader } from "./ConfigReader";

export const App: React.FC = () => {
  return <ConfigReader GameController={GameController} />;
};
