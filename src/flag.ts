import { FlagConfig, UserContext, LocationContext } from "./types/types";

export class FeaturesManager {
  private flags: { [key: string]: FlagConfig };
  private defaultPercentage: number;

  constructor(
    config: {
      flags?: { [key: string]: FlagConfig };
      defaultPercentage?: number;
    } = {}
  ) {
    this.flags = config.flags || {};
    this.defaultPercentage = config.defaultPercentage || 100;
  }

  public isFeatureEnabled(
    feature: string,
    userContext: UserContext,
    locationContext: LocationContext,
  ): boolean {
    const flag = this.flags[feature];

    if (!flag) {
      return false;
    }

    if (flag.enabled === false) {
      return false;
    }

    if (
      flag.users &&
      flag.users.includes(userContext.userId || userContext.username || "")
    ) {
      return true;
    }

    if (
      flag.locations &&
      flag.locations.includes(
        locationContext.city ||
          locationContext.state ||
          locationContext.country ||
          ""
      )
    ) {
      return true;
    }

    if (flag.percentage !== undefined) {
      return this.evaluatePercentage(
        flag.percentage,
        userContext,
        locationContext
      );
    }

    return flag.enabled !== undefined ? flag.enabled : true;
  }

  private evaluatePercentage(
    percentage: number,
    userContext: UserContext,
    locationContext: LocationContext
  ): boolean {
    const uniqueKey = `${userContext.userId || ""}:${
      userContext.username || ""
    }:${locationContext.city || ""}:${locationContext.state || ""}:${
      locationContext.country || ""
    }`;

    const hash = this.hashUniqueKey(uniqueKey);
    return hash % 100 < percentage;
  }

  private hashUniqueKey(uniqueKey: string): number {
    let hash = 0;
    for (let i = 0; i < uniqueKey.length; i++) {
      hash = (hash << 5) - hash + uniqueKey.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash);
  }
}
