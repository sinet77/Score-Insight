import styles from "../../CompareTeams/H2HTeams/StatsData/StatsData.module.scss";
import { StatItem } from "@components/StatsH2H/StatItem/StatItem";
import { StatSection } from "@components/StatsH2H/StatSection/StatSection";
import { Player } from "@components/PlayerDetails/player-types";

type PlayerComparisionProps = {
  playerOne: Player | null;
  playerTwo: Player | null;
};

const NA = "N/A";

export const PlayersStatsData = ({
  playerOne,
  playerTwo,
}: PlayerComparisionProps) => {
  const getScoreClass = (score: number) => {
    if (score >= 7) return styles.green;
    if (score >= 4) return styles.orange;
    return styles.red;
  };

  const renderFlagWithCountry = (flag?: string, country?: string) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      {flag && (
        <img
          src={flag}
          alt="flag or logo"
          style={{ width: "22px", height: "20px", objectFit: "contain" }}
        />
      )}
      {country ?? NA}
    </span>
  );

  return (
    <div className={styles["stats-container"]}>
      <StatSection title="General">
        <StatItem
          label=""
          leftValue={playerOne?.player.photo ?? NA}
          rightValue={playerTwo?.player.photo ?? NA}
        />
        <StatItem
          label="Last Name"
          leftValue={playerOne?.player.lastname ?? NA}
          rightValue={playerTwo?.player.lastname ?? NA}
        />
        <StatItem
          label="First Name"
          leftValue={playerOne?.player.firstname ?? NA}
          rightValue={playerTwo?.player.firstname ?? NA}
        />
        <StatItem
          label="Nationality"
          leftValue={playerOne?.player.nationality ?? NA}
          rightValue={playerTwo?.player.nationality ?? NA}
        />
        <StatItem
          label="Age"
          leftValue={playerOne?.player.age ?? NA}
          rightValue={playerTwo?.player.age ?? NA}
        />
        <StatItem
          label="Birthdate"
          leftValue={playerOne?.player.birth?.date ?? NA}
          rightValue={playerTwo?.player.birth?.date ?? NA}
        />

        <StatItem
          label="Birth Country"
          leftValue={playerOne?.player.birth?.country ?? NA}
          rightValue={playerTwo?.player.birth?.country ?? NA}
        />

        <StatItem
          label="Height"
          leftValue={playerOne?.player.height ?? NA}
          rightValue={playerTwo?.player.height ?? NA}
        />
        <StatItem
          label="Weight"
          leftValue={playerOne?.player.weight ?? NA}
          rightValue={playerTwo?.player.weight ?? NA}
        />
      </StatSection>
      <StatSection title="Team & League">
        <StatItem
          label="Team"
          leftValue={renderFlagWithCountry(
            playerOne?.statistics?.[0]?.team?.logo ?? NA,
            playerOne?.statistics?.[0]?.team?.name ?? NA
          )}
          rightValue={renderFlagWithCountry(
            playerTwo?.statistics?.[0]?.league?.flag ?? NA,
            playerTwo?.statistics?.[0]?.league?.country ?? NA
          )}
        />
        <StatItem
          label="League"
          leftValue={renderFlagWithCountry(
            playerOne?.statistics?.[0]?.league?.logo ?? NA,
            playerOne?.statistics?.[0]?.league?.name ?? NA
          )}
          rightValue={renderFlagWithCountry(
            playerTwo?.statistics?.[0]?.league?.logo ?? NA,
            playerTwo?.statistics?.[0]?.league?.name ?? NA
          )}
        />
        <StatItem
          label="Country"
          leftValue={renderFlagWithCountry(
            playerOne?.statistics?.[0]?.league?.flag ?? NA,
            playerOne?.statistics?.[0]?.league?.country ?? NA
          )}
          rightValue={renderFlagWithCountry(
            playerTwo?.statistics?.[0]?.league?.flag ?? NA,
            playerTwo?.statistics?.[0]?.league?.country ?? NA
          )}
        />
        <StatItem
          label="Season"
          leftValue={playerOne?.statistics?.[0]?.league?.season ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.league?.season ?? NA}
        />
      </StatSection>

      <StatSection title="Games">
        <StatItem
          label="Appearances"
          leftValue={playerOne?.statistics?.[0]?.games?.appearences ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.games?.appearences ?? NA}
        />
        <StatItem
          label="Lineups"
          leftValue={playerOne?.statistics?.[0]?.games?.lineups ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.games?.lineups ?? NA}
        />
        <StatItem
          label="Minutes"
          leftValue={playerOne?.statistics?.[0]?.games?.minutes ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.games?.minutes ?? NA}
        />
        <StatItem
          label="Position"
          leftValue={playerOne?.statistics?.[0]?.games?.position ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.games?.position ?? NA}
        />
        <StatItem
          label="Rating"
          leftValue={
            playerOne?.statistics?.[0]?.games?.rating
              ? parseFloat(playerOne.statistics[0].games.rating).toFixed(2)
              : NA
          }
          rightValue={
            playerTwo?.statistics?.[0]?.games?.rating
              ? parseFloat(playerTwo.statistics[0].games.rating).toFixed(2)
              : NA
          }
          leftClassName={
            playerOne?.statistics?.[0]?.games?.rating
              ? getScoreClass(parseFloat(playerOne.statistics[0].games.rating))
              : ""
          }
          rightClassName={
            playerTwo?.statistics?.[0]?.games?.rating
              ? getScoreClass(parseFloat(playerTwo.statistics[0].games.rating))
              : ""
          }
        />
        <StatItem
          label="Captain"
          leftValue={playerOne?.statistics?.[0]?.games?.captain ? "Yes" : "No"}
          rightValue={playerTwo?.statistics?.[0]?.games?.captain ? "Yes" : "No"}
        />
      </StatSection>

      <StatSection title="Substitutes">
        <StatItem
          label="In"
          leftValue={playerOne?.statistics?.[0]?.substitutes?.in ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.in ?? NA}
        />
        <StatItem
          label="Out"
          leftValue={playerOne?.statistics?.[0]?.substitutes?.out ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.out ?? NA}
        />
        <StatItem
          label="Bench"
          leftValue={playerOne?.statistics?.[0]?.substitutes?.bench ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.bench ?? NA}
        />
      </StatSection>

      <StatSection title="Goals & Shots">
        <StatItem
          label="Goals"
          leftValue={playerOne?.statistics?.[0]?.goals?.total ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.goals?.total ?? NA}
        />
        <StatItem
          label="Assists"
          leftValue={playerOne?.statistics?.[0]?.goals?.assists ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.goals?.assists ?? NA}
        />
        <StatItem
          label="Shots Total"
          leftValue={playerOne?.statistics?.[0]?.shots?.total ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.shots?.total ?? NA}
        />
        <StatItem
          label="Shots On Target"
          leftValue={playerOne?.statistics?.[0]?.shots?.on ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.shots?.on ?? NA}
        />
      </StatSection>

      <StatSection title="Passes">
        <StatItem
          label="Total Passes"
          leftValue={playerOne?.statistics?.[0]?.passes?.total ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.passes?.total ?? NA}
        />
        <StatItem
          label="Key Passes"
          leftValue={playerOne?.statistics?.[0]?.passes?.key ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.passes?.key ?? NA}
        />
      </StatSection>

      <StatSection title="Tackles & Duels">
        <StatItem
          label="Tackles"
          leftValue={playerOne?.statistics?.[0]?.tackles?.total ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.tackles?.total ?? NA}
        />
        <StatItem
          label="Blocks"
          leftValue={playerOne?.statistics?.[0]?.tackles?.blocks ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.tackles?.blocks ?? NA}
        />
        <StatItem
          label="Interceptions"
          leftValue={
            playerOne?.statistics?.[0]?.tackles?.interceptions ?? NA
          }
          rightValue={
            playerTwo?.statistics?.[0]?.tackles?.interceptions ?? NA
          }
        />
        <StatItem
          label="Duels Total"
          leftValue={playerOne?.statistics?.[0]?.duels?.total ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.duels?.total ?? NA}
        />
        <StatItem
          label="Duels Won"
          leftValue={playerOne?.statistics?.[0]?.duels?.won ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.duels?.won ?? NA}
        />
      </StatSection>

      <StatSection title="Discipline">
        <StatItem
          label="Fouls Drawn"
          leftValue={playerOne?.statistics?.[0]?.fouls?.drawn ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.fouls?.drawn ?? NA}
        />
        <StatItem
          label="Fouls Committed"
          leftValue={playerOne?.statistics?.[0]?.fouls?.committed ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.fouls?.committed ?? NA}
        />
        <StatItem
          label="Yellow Cards"
          leftValue={playerOne?.statistics?.[0]?.cards?.yellow ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.cards?.yellow ?? NA}
        />
        <StatItem
          label="Red Cards"
          leftValue={playerOne?.statistics?.[0]?.cards?.red ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.cards?.red ?? NA}
        />
      </StatSection>

      <StatSection title="Penalty">
        <StatItem
          label="Scored"
          leftValue={playerOne?.statistics?.[0]?.penalty?.scored ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.penalty?.scored ?? NA}
        />
        <StatItem
          label="Missed"
          leftValue={playerOne?.statistics?.[0]?.penalty?.missed ?? NA}
          rightValue={playerTwo?.statistics?.[0]?.penalty?.missed ?? NA}
        />
      </StatSection>
    </div>
  );
};
