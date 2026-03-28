import fs from "fs/promises";
import path from "path";

import { PodcastModel } from "../models/podcast-model";
import { FileReadError } from "../errors/app-error";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
  podcastName?: string
): Promise<PodcastModel[]> => {
  try {
    const rawData = await fs.readFile(pathData, "utf-8");
    let jsonFile: PodcastModel[] = JSON.parse(rawData);

    if (podcastName) {
      jsonFile = jsonFile.filter(
        (podcast: PodcastModel) => podcast.podcastName === podcastName
      );
    }

    return jsonFile;
  } catch (error) {
    throw new FileReadError(`Failed to read podcast data: ${error}`);
  }
};
