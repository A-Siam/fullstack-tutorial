import { RESTDataSource } from "apollo-datasource-rest";

interface LaunchAPIResult {
  flight_number: number;
  mission_name: string;
  links: {
    mission_patch_small: string;
    mission_patch: string;
  };
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
  };
}

interface Launch {
  id: number;
  mission: {
    name: string;
    missionPatchSmall: string;
    missionPatchLarge: string;
  };
  rocket: {
    id: string;
    name: string;
    type: string;
  };
}

type launchId = string;

class LaunchConversionError extends Error {
  constructor(
    message: string = "failed to convert the response to launch object"
  ) {
    super(message);
    this.name = "LaunchConversionError";
  }
}

export default class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }
  async getAllLaunches() {
    try {
      const response = await this.get("launches");
      return Array.isArray(response)
        ? response.map((launch) => this.launchReducer(launch))
        : [];
    } catch (error) {
      console.error("error while retrieving the data", error);
    }
  }
  launchReducer(launch: LaunchAPIResult): Launch {
    try {
      return {
        id: launch.flight_number || -1,
        mission: {
          name: launch.mission_name,
          missionPatchSmall: launch.links.mission_patch_small,
          missionPatchLarge: launch.links.mission_patch,
        },
        rocket: {
          id: launch.rocket.rocket_id,
          name: launch.rocket.rocket_name,
          type: launch.rocket.rocket_type,
        },
      };
    } catch (e) {
      throw new LaunchConversionError();
    }
  }

  async getLaunchById(launchId: launchId): Promise<Launch> {
    try {
      const resp = await this.get("launches", { flight_number: launchId });
      return this.launchReducer(resp[0]);
    } catch (e) {
      //   throw new Error("Failed to retrieve launch by the specified id");
      throw e;
    }
  }

  async getLaunchesByIds(launchIds: launchId[]): Promise<Launch[]> {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById(launchId))
    );
  }
}
