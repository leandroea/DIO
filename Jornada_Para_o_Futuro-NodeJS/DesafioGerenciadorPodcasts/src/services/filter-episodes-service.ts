import { PodcastTransferModel } from "../models/Podcast-Transfer-Model";
import { repositoryPodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";
import { PodcastNotFoundError, InvalidInputError } from "../errors/app-error";

export const serviceFilterEpisodes = async (
  podcastName: string | undefined
): Promise<PodcastTransferModel> => {
  // Define the return interface
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  // Extract query parameter
  const queryString = podcastName?.split("?p=")[1] || "";

  // Validate input
  if (!queryString || queryString.trim() === "") {
    throw new InvalidInputError("Podcast name query parameter 'p' is required");
  }

  // Fetch data
  const data = await repositoryPodcast(queryString);

  // Check if podcast was found
  if (data.length === 0) {
    throw new PodcastNotFoundError(queryString);
  }

  responseFormat = {
    statusCode: StatusCode.OK,
    body: data,
  };

  return responseFormat;
};
