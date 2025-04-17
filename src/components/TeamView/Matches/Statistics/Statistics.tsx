import { useEffect, useState } from "react";
import { getFixtureStats } from "@api/fixturesStats_api";
import StatisticsBar from "./StatisticsBar";
import styles from "./Statistics.module.scss";
import { Fixture, TeamStatistics } from "./stats-types";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";

export const Statistics = ({ currentFixture }: { currentFixture: Fixture }) => {
  const [stats, setStats] = useState<TeamStatistics[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setStats([]);
    setIsLoading(true);

    const fetchStats = async () => {
      if (!currentFixture) return;

      const fixtureId = currentFixture.fixture.id;
      const fixtureStats = await getFixtureStats(fixtureId);

      if (fixtureStats && isMounted) {
        setStats(fixtureStats);
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [currentFixture]);

  const parseValue = (value: string | number | null): number => {
    if (value === null) return 0; 
    if (typeof value === "string") {
      const numericValue = value.includes('%') ? parseFloat(value.replace('%', '')) : parseFloat(value);
      return isNaN(numericValue) ? 0 : numericValue; 
    }
    return value; 
  };

  const team1Stats = stats[0]?.statistics ?? [];
  const team2Stats = stats[1]?.statistics ?? [];

  // Map stat by type for sorting
  const combinedStats = team1Stats.map((stat, index) => ({
    label: stat.type,
    team1Value: parseValue(stat.value),
    team2Value: parseValue(team2Stats[index].value),
  }));

  // Sort: Ball Possession always first
  const sortedStats = combinedStats.sort((a, b) => {
    if (a.label === "Ball Possession") return -1;
    if (b.label === "Ball Possession") return 1;
    return 0;
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h3 className={styles["title"]}>📊 Match summary</h3>
          {sortedStats.length > 0 && (
            <div>
              {sortedStats.map((stat) => (
                <StatisticsBar
                  key={`${stat.label}-${currentFixture?.fixture?.id}`}
                  label={stat.label}
                  team1Value={stat.team1Value}
                  team2Value={stat.team2Value}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
