import React, { useEffect } from "react";
import { GameConfig } from "./GameConfig";
import { RngServerResponse } from "./RngServerResponse";
import { RngServerRequest } from "./RngServerRequest";

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
    const url = `//${hostname}:${port}/${radius}`;

    fetch(url, {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrerPolicy: "no-referrer",
      body: "[]",
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((r) => r.json())
      .then((response: RngServerResponse) => {
        onReceived(response);
      });
  });

  return <></>;
};
