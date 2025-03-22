import { useState, useEffect } from "react";
import "./leagueTeams.scss";
import { leagueTeamsApi } from "./leagueTeams-api";
import type { TeamStanding, LeagueStanding } from "./standings-types";

interface TeamTableProps {
  leagueId: number;
  season: string;
}

export const TeamTable = ({ leagueId, season }: TeamTableProps) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<{
    name: string;
    logo: string;
    country: string;
    flag: string;
  } | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const data = await leagueTeamsApi.get(leagueId,season);

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
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      } else {
        return [...prev, teamId];
      }
    });
  };

  const getFormClass = (result: string) => {
    switch (result) {
      case "W":
        return "win";
      case "D":
        return "draw";
      case "L":
        return "loss";
      default:
        return "";
    }
  };

  return (
    <div className="team-table-container">
      {leagueInfo && (
        <div className="league-header">
          <div className="league-info">
            <img
              src={leagueInfo.logo || "/placeholder.svg"}
              alt={leagueInfo.name}
              className="league-info__league-logo"
            />
            <h2 className="table-title">{leagueInfo.name}</h2>
          </div>
          <div className="country-info">
            <img
              src={leagueInfo.flag || "/placeholder.svg"}
              alt={leagueInfo.country}
              className="country-info__country-flag"
            />
            <span>{leagueInfo.country}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-container__loading-spinner"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="table-header">
            <div className="position-column">#</div>
            <div className="team-column">Team</div>
            <div className="stat-column">M</div>
            <div className="stat-column">W</div>
            <div className="stat-column">D</div>
            <div className="stat-column">L</div>
            <div className="stat-column">+/-</div>
            <div className="stat-column">Goals</div>
            <div className="last-five-column">Last 5</div>
            <div className="points-column">PTS</div>
          </div>

          <div className="teams-container">
            {standings.map((team) => (
              <div key={team.team.id} className="team-row">
                <div
                  className={`team-card ${
                    expandedTeams.includes(team.team.id)
                      ? "team-card--expanded"
                      : ""
                  }`}
                  onClick={() => handleTeamClick(team.team.id)}
                >
                  <div className="position-column">{team.rank}</div>
                  <div className="team-column">
                    <img
                      src={team.team.logo}
                      alt={team.team.name}
                      className="team-column__team-logo"
                    />
                    <span className="team-column__team-name">{team.team.name}</span>
                  </div>
                  <div className="stat-column">{team.all.played}</div>
                  <div className="stat-column">{team.all.win}</div>
                  <div className="stat-column">{team.all.draw}</div>
                  <div className="stat-column">{team.all.lose}</div>
                  <div className="stat-column">
                    {team.goalsDiff > 0 ? "+" : ""}
                    {team.goalsDiff}
                  </div>
                  <div className="stat-column">
                    {team.all.goals.for}:{team.all.goals.against}
                  </div>
                  <div className="last-five-column">
                    {team.form.split("").map((result, index) => (
                      <span
                        key={`${team.team.id}-${index}`}
                        className={`result-badge ${getFormClass(result)}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                  <div className="points-column">{team.points}</div>
                </div>

                {expandedTeams.includes(team.team.id) && (
                  <div className="team-details">
                    <div className="team-stats-section">
                      <h4>Home</h4>
                      <div className="team-stats-grid">
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Matches</span>
                          <span className="team-stat-item__stat-value">{team.home.played}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Won</span>
                          <span className="team-stat-item__stat-value">{team.home.win}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Draws</span>
                          <span className="team-stat-item__stat-value">{team.home.draw}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Loses</span>
                          <span className="team-stat-item__stat-value">{team.home.lose}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Goals</span>
                          <span className="team-stat-item__stat-value">
                            {team.home.goals.for}:{team.home.goals.against}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="team-stats-section">
                      <h4>Away</h4>
                      <div className="team-stats-grid">
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Matches</span>
                          <span className="team-stat-item__stat-value">{team.away.played}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Won</span>
                          <span className="team-stat-item__stat-value">{team.away.win}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Draws</span>
                          <span className="team-stat-item__stat-value">{team.away.draw}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Loses</span>
                          <span className="team-stat-item__stat-value">{team.away.lose}</span>
                        </div>
                        <div className="team-stat-item">
                          <span className="team-stat-item__stat-label">Goals</span>
                          <span className="team-stat-item__stat-value">
                            {team.away.goals.for}:{team.away.goals.against}
                          </span>
                        </div>
                      </div>
                    </div>

                    {team.description && (
                      <div className="team-description">
                        <span className="team-description__description-label">Status:</span>
                        <span className="team-description__description-value">
                          {team.description}
                        </span>
                      </div>
                    )}
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

export default TeamTable;
