import React from "react";
import { GameConfig } from "./GameConfig";

export const ConfigReader: React.FC<{
  GameController: React.FC<GameConfig>;
}> = ({ GameController }) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const hostname =
    params.get("hostname") || ("hex2048-lambda.octa.wtf" as string);
  const port: number = parseInt(params.get("port") || "80", 10);
  const radius: number = parseInt(params.get("radius") || "2", 10);

  return <GameController hostname={hostname} port={port} radius={radius} />;
};
