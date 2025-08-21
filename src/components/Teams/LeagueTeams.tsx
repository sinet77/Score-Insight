import { useState, useEffect } from "react";
import styles from "./LeagueTeams.module.scss";
import { leagueTeamsApi } from "../../api/leagueTeams-api";
import type { TeamStanding, LeagueStanding } from "./standings-types";
import { RenderTeamStats } from "./RenderTeamStats";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import { useFavouriteTeam } from "../../hooks/useFavouriteTeam";

interface TeamTableProps {
  leagueId: number;
  season: string;
  showInlineFavourite?: boolean;
}

export const LeagueTeams = ({
  leagueId,
  season,
  showInlineFavourite,
}: TeamTableProps) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    logo: string;
    country: string;
    flag: string;
  } | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);

  const { fav, toggle } = useFavouriteTeam();

  const navigate = useNavigate();

  const handleReadMore = (teamName: string, teamId: number) => {
    navigate(`/team/${leagueId}/${season}/${teamName}/${teamId}`);
  };

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const data = await leagueTeamsApi.get(leagueId, season);

        if (data && data.response.length > 0) {
          const leagueStanding: LeagueStanding = data.response[0];
          setStandings(leagueStanding.league.standings[0]);
          setLeagueInfo({
            name: leagueStanding.league.name,
            logo: leagueStanding.league.logo,
            country: leagueStanding.league.country,
            flag: leagueStanding.league.flag,
          });
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId, season]);

  const handleTeamClick = (teamId: number) => {
    setExpandedTeams((prev) => {
      const isExpanded = prev.includes(teamId);

      // Jeśli drużyna jest już rozwinięta, to ją zwijamy
      if (isExpanded) {
        return prev.filter((id) => id !== teamId);
      }

      // Jeśli drużyna nie była rozwinięta, to ją rozwijamy
      const updatedExpandedTeams = [...prev, teamId];

      return updatedExpandedTeams;
    });
  };

  const getFormClass = (result: string) => {
    switch (result) {
      case "W":
        return styles.win;
      case "D":
        return styles.draw;
      case "L":
        return styles.loss;
      default:
        return "";
    }
  };

  return (
    <div className={styles["team-table-container"]}>
      {leagueInfo && (
        <div className={styles["league-header"]}>
          <div className={styles["league-info"]}>
            <img
              src={leagueInfo.logo || "/placeholder.svg"}
              alt={leagueInfo.name}
              className={styles["league-info__league-logo"]}
            />
            <h2 className="title title--fs24">{leagueInfo.name}</h2>
          </div>
          {showInlineFavourite && fav && (
            <button
              className={`button ${styles["favourite-button"]}`}
              onClick={() => toggle(fav)}
            >
              Remove favourite
            </button>
          )}
          <div className={styles["country-info"]}>
            <img
              src={leagueInfo.flag || "/placeholder.svg"}
              alt={leagueInfo.country}
              className={styles["country-info__country-flag"]}
            />
            <span>{leagueInfo.country}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles["loading-container"]}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={styles["table-header"]}>
            <div className={styles["position-column"]}>#</div>
            <div className={styles["team-column"]}>Team</div>
            <div className={styles["stat-column"]}>M</div>
            <div
              className={`${styles["stat-column"]} ${styles["mobile-visible"]}`}
            >
              W
            </div>
            <div className={styles["stat-column"]}>D</div>
            <div className={styles["stat-column"]}>L</div>
            <div className={styles["stat-column"]}>+/-</div>
            <div
              className={`${styles["stat-column"]} ${styles["mobile-visible"]}`}
            >
              Goals
            </div>
            <div className={styles["last-five-column"]}>Last 5</div>
            <div className={styles["points-column"]}>PTS</div>
          </div>

          <div className={styles["teams-container"]}>
            {standings.map((team) => (
              <div key={team.team.id} className={styles["team-row"]}>
                <button
                  className={`${styles["team-card"]} ${
                    expandedTeams.includes(team.team.id)
                      ? styles["team-card--expanded"]
                      : ""
                  }`}
                  onClick={() => handleTeamClick(team.team.id)}
                >
                  <div className={styles["position-column"]}>{team.rank}</div>
                  <div className={styles["team-column"]}>
                    <img
                      src={team.team.logo}
                      alt={team.team.name}
                      className={styles["team-column__team-logo"]}
                    />
                    <span className={styles["team-column"]}>
                      {team.team.name}
                    </span>
                  </div>
                  <div className={styles["stat-column"]}>{team.all.played}</div>
                  <div
                    className={`${styles["stat-column"]} ${styles["mobile-visible"]}`}
                  >
                    {team.all.win}
                  </div>
                  <div className={styles["stat-column"]}>{team.all.draw}</div>
                  <div className={styles["stat-column"]}>{team.all.lose}</div>
                  <div className={styles["stat-column"]}>
                    {team.goalsDiff > 0 ? "+" : ""}
                    {team.goalsDiff}
                  </div>
                  <div
                    className={`${styles["stat-column"]} ${styles["mobile-visible"]}`}
                  >
                    {team.all.goals.for}:{team.all.goals.against}
                  </div>
                  <div className={styles["last-five-column"]}>
                    {team.form.split("").map((result, index) => (
                      <span
                        key={`${team.team.id}-${index}`}
                        className={`${styles["result-badge"]} ${getFormClass(
                          result
                        )}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                  <div className={styles["points-column"]}>{team.points}</div>
                </button>

                {expandedTeams.includes(team.team.id) && (
                  <div className={styles["team-details"]}>
                    <RenderTeamStats side="home" team={team} />
                    <RenderTeamStats side="away" team={team} />

                    <button
                      className={`button ${styles["read-more-button"]}`}
                      onClick={() =>
                        handleReadMore(team.team.name, team.team.id)
                      }
                    >
                      Read More
                    </button>
                    <button
                      className={`button ${styles["favourite-button"]}`}
                      onClick={() =>
                        toggle({
                          id: team.team.id,
                          name: team.team.name,
                          logo: team.team.logo,
                        })
                      }
                    >
                      {fav?.id === team.team.id
                        ? "Remove favourite"
                        : "Add favourite"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
