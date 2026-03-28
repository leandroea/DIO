import * as http from "http";

import {
  getListEpisodes,
  getFilterEpisodes,
} from "./controllers/podscasts-controller";

import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  try {
    const baseUrl = request.url?.split("?")[0];

    if (request.method === HttpMethod.GET && baseUrl === Routes.LIST) {
      await getListEpisodes(request, response);
      return;
    }

    if (request.method === HttpMethod.GET && baseUrl === Routes.ESPISODE) {
      await getFilterEpisodes(request, response);
      return;
    }

    // If no route matches, call not found handler
    notFoundHandler(request, response);
  } catch (error) {
    // Pass any unhandled error to the error handler
    errorHandler(error as Error, request, response);
  }
};
