import React, { useEffect } from "react";
import { GameConfig } from "./GameConfig";
import { RngServerResponse } from "./RngServerResponse";
import { RngServerRequest } from "./RngServerRequest";
import axios, { AxiosError, AxiosResponse } from "axios";

type GetDataProps = GameConfig & {
  onReceived: (r: RngServerResponse) => void;
  request: RngServerRequest;
};
export const GetData: React.FC<GetDataProps> = ({
  hostname,
  port,
  radius,
  onReceived,
  request,
}) => {
  useEffect(() => {
    const url = `${window.location.protocol}://${hostname}:${port}/${radius}`;

    axios
      .post(url, request)
      .then((response: AxiosResponse<RngServerResponse>) => {
        onReceived(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error); // TODO add better error handling
      });
  });

  return <></>;
};
