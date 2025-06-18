import axios from "axios";
import type { AuthSuccessResponse } from "./types";
import { appConfig } from "../../config/appConfig";

export const loginWithCredentials = async (
  username: string,
  password: string,
): Promise<AuthSuccessResponse> => {
  const response = await axios.post(
    `${appConfig.baseUrl || "http://localhost:3001"}/login`,
    { username, password },
  );
  return response.data;
};
