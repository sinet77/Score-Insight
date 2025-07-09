import styles from "../../CompareTeams/H2HTeams/StatsData/StatsData.module.scss";
import { StatItem } from "@components/StatsH2H/StatItem/StatItem";
import { StatSection } from "@components/StatsH2H/StatSection/StatSection";
import { Player } from "@components/PlayerDetails/player-types";

type PlayerComparisionProps = {
  playerOne: Player | null;
  playerTwo: Player | null;
};

export const PlayersStatsData = ({
  playerOne,
  playerTwo,
}: PlayerComparisionProps) => {
  console.log(
    "PlayersStatsData component rendered with players:",
    playerOne,
    playerTwo
  );
  return (
    <div className={styles["stats-container"]}>
      <StatSection title="General">
        <StatItem
          leftValue={playerOne?.player.firstname ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.goals.total ?? "N/A"}
          label="Name"
        />
      </StatSection>
      <StatSection title="General">
        <StatItem
          label=""
          leftValue={playerOne?.player.photo ?? "N/A"}
          rightValue={playerTwo?.player.photo ?? "N/A"}
        />
        <StatItem
          label="Last Name"
          leftValue={playerOne?.player.lastname ?? "N/A"}
          rightValue={playerTwo?.player.lastname ?? "N/A"}
        />
        <StatItem
          label="First Name"
          leftValue={playerOne?.player.firstname ?? "N/A"}
          rightValue={playerTwo?.player.firstname ?? "N/A"}
        />
        <StatItem
          label="Nationality"
          leftValue={playerOne?.player.nationality ?? "N/A"}
          rightValue={playerTwo?.player.nationality ?? "N/A"}
        />
        <StatItem
          label="Age"
          leftValue={playerOne?.player.age?.toString() ?? "N/A"}
          rightValue={playerTwo?.player.age?.toString() ?? "N/A"}
        />
        <StatItem
          label="Birthdate"
          leftValue={playerOne?.player.birth?.date ?? "N/A"}
          rightValue={playerTwo?.player.birth?.date ?? "N/A"}
        />

        <StatItem
          label="Birth Country"
          leftValue={playerOne?.player.birth?.country ?? "N/A"}
          rightValue={playerTwo?.player.birth?.country ?? "N/A"}
        />

        <StatItem
          label="Height"
          leftValue={playerOne?.player.height ?? "N/A"}
          rightValue={playerTwo?.player.height ?? "N/A"}
        />
        <StatItem
          label="Weight"
          leftValue={playerOne?.player.weight ?? "N/A"}
          rightValue={playerTwo?.player.weight ?? "N/A"}
        />
      </StatSection>
      <StatSection title="Team & League">
        <StatItem
          label="Team"
          leftValue={playerOne?.statistics?.[0]?.team?.logo ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.team?.logo ?? "N/A"}
        />
        <StatItem
          label="Team Name"
          leftValue={playerOne?.statistics?.[0]?.team?.name ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.team?.name ?? "N/A"}
        />
        <StatItem
          label="League"
          leftValue={playerOne?.statistics?.[0]?.league?.name ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.league?.name ?? "N/A"}
        />
        <StatItem
          label="Country"
          leftValue={playerOne?.statistics?.[0]?.league?.country ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.league?.country ?? "N/A"}
        />
        <StatItem
          label="League Flag"
          leftValue={playerOne?.statistics?.[0]?.league?.flag ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.league?.flag ?? "N/A"}
        />
        <StatItem
          label="Season"
          leftValue={playerOne?.statistics?.[0]?.league?.season ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.league?.season ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Games">
        <StatItem
          label="Appearances"
          leftValue={playerOne?.statistics?.[0]?.games?.appearences ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.games?.appearences ?? "N/A"}
        />
        <StatItem
          label="Lineups"
          leftValue={playerOne?.statistics?.[0]?.games?.lineups ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.games?.lineups ?? "N/A"}
        />
        <StatItem
          label="Minutes"
          leftValue={playerOne?.statistics?.[0]?.games?.minutes ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.games?.minutes ?? "N/A"}
        />
        <StatItem
          label="Position"
          leftValue={playerOne?.statistics?.[0]?.games?.position ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.games?.position ?? "N/A"}
        />
        <StatItem
          label="Rating"
          leftValue={playerOne?.statistics?.[0]?.games?.rating ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.games?.rating ?? "N/A"}
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
          leftValue={playerOne?.statistics?.[0]?.substitutes?.in ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.in ?? "N/A"}
        />
        <StatItem
          label="Out"
          leftValue={playerOne?.statistics?.[0]?.substitutes?.out ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.out ?? "N/A"}
        />
        <StatItem
          label="Bench"
          leftValue={playerOne?.statistics?.[0]?.substitutes?.bench ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.substitutes?.bench ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Goals & Shots">
        <StatItem
          label="Goals"
          leftValue={playerOne?.statistics?.[0]?.goals?.total ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.goals?.total ?? "N/A"}
        />
        <StatItem
          label="Assists"
          leftValue={playerOne?.statistics?.[0]?.goals?.assists ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.goals?.assists ?? "N/A"}
        />
        <StatItem
          label="Shots Total"
          leftValue={playerOne?.statistics?.[0]?.shots?.total ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.shots?.total ?? "N/A"}
        />
        <StatItem
          label="Shots On Target"
          leftValue={playerOne?.statistics?.[0]?.shots?.on ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.shots?.on ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Passes">
        <StatItem
          label="Total Passes"
          leftValue={playerOne?.statistics?.[0]?.passes?.total ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.passes?.total ?? "N/A"}
        />
        <StatItem
          label="Key Passes"
          leftValue={playerOne?.statistics?.[0]?.passes?.key ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.passes?.key ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Tackles & Duels">
        <StatItem
          label="Tackles"
          leftValue={playerOne?.statistics?.[0]?.tackles?.total ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.tackles?.total ?? "N/A"}
        />
        <StatItem
          label="Blocks"
          leftValue={playerOne?.statistics?.[0]?.tackles?.blocks ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.tackles?.blocks ?? "N/A"}
        />
        <StatItem
          label="Interceptions"
          leftValue={
            playerOne?.statistics?.[0]?.tackles?.interceptions ?? "N/A"
          }
          rightValue={
            playerTwo?.statistics?.[0]?.tackles?.interceptions ?? "N/A"
          }
        />
        <StatItem
          label="Duels Total"
          leftValue={playerOne?.statistics?.[0]?.duels?.total ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.duels?.total ?? "N/A"}
        />
        <StatItem
          label="Duels Won"
          leftValue={playerOne?.statistics?.[0]?.duels?.won ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.duels?.won ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Discipline">
        <StatItem
          label="Fouls Drawn"
          leftValue={playerOne?.statistics?.[0]?.fouls?.drawn ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.fouls?.drawn ?? "N/A"}
        />
        <StatItem
          label="Fouls Committed"
          leftValue={playerOne?.statistics?.[0]?.fouls?.committed ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.fouls?.committed ?? "N/A"}
        />
        <StatItem
          label="Yellow Cards"
          leftValue={playerOne?.statistics?.[0]?.cards?.yellow ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.cards?.yellow ?? "N/A"}
        />
        <StatItem
          label="Red Cards"
          leftValue={playerOne?.statistics?.[0]?.cards?.red ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.cards?.red ?? "N/A"}
        />
      </StatSection>

      <StatSection title="Penalty">
        <StatItem
          label="Scored"
          leftValue={playerOne?.statistics?.[0]?.penalty?.scored ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.penalty?.scored ?? "N/A"}
        />
        <StatItem
          label="Missed"
          leftValue={playerOne?.statistics?.[0]?.penalty?.missed ?? "N/A"}
          rightValue={playerTwo?.statistics?.[0]?.penalty?.missed ?? "N/A"}
        />
      </StatSection>
    </div>
  );
};
