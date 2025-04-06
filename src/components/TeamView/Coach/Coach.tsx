import { useEffect, useState } from "react";
import { coachsApi } from "@api/coach-api";
import { Coach as CoachType, CoachApiResponse } from "./coach-types";
import styles from "./Coach.module.scss"; // Import modułu SCSS
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";

interface CoachProps {
  teamId: number;
  season: string;
}

export const Coach = ({ teamId, season }: CoachProps) => {
  const [coach, setCoach] = useState<CoachType | null>(null);
  const [loading, setLoading] = useState(true);

  const getCoachForSeason = (
    coaches: CoachType[],
    teamId: number,
    season: string
  ): CoachType | undefined => {
    return coaches.find((coach) =>
      coach.career.some(
        (job) =>
          job.team.id === teamId &&
          job.start.slice(0, 4) <= season &&
          (job.end === null || job.end.slice(0, 4) >= season)
      )
    );
  };

  useEffect(() => {
    const fetchCoach = async () => {
      if (!teamId || !season) return;

      try {
        setLoading(true);
        const response: CoachApiResponse = await coachsApi.get(teamId);

        const selectedCoach = getCoachForSeason(
          response.response,
          teamId,
          season
        );
        setCoach(selectedCoach ?? null);
      } catch (error) {
        console.error("Error fetching coach:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [teamId, season]);

  if (loading) return <LoadingSpinner />;

  const currentJob = coach?.career.find((job) => job.end === null);
  const pastJobs = coach?.career.filter((job) => job.end !== null) || [];

  return (
    <div className={styles["coachContainer"]}>
      {coach ? (
        <div className={styles["coachDetails"]}>
          <div className={styles["wrapper"]}>
            <div className={styles["coachInfo"]}>
              <img
                src={coach.photo}
                alt={coach.name}
                className={styles["coachPhoto"]}
              />
              <p className={styles["coachName"]}>{coach.name}</p>
              <div>
                {" "}
                <p>
                  <strong>Age:</strong> {coach.age}
                </p>
                <p>
                  <strong>Birth Date:</strong> {coach.birth.date} (
                  {coach.birth.place}, {coach.birth.country})
                </p>
                <p>
                  <strong>Nationality:</strong> {coach.nationality}
                </p>
              </div>
            </div>

            {currentJob && (
              <div className={styles["currentJob"]}>
                <h2 className="title title--fs24black">Currently Coaching</h2>
                <div className={styles["jobDetails"]}>
                  <h4>{currentJob.team.name}</h4>
                  <p>
                    <strong>Start:</strong> {currentJob.start}
                  </p>
                  <p>
                    <strong>End:</strong> Present
                  </p>
                  <img
                    src={currentJob.team.logo}
                    alt={currentJob.team.name}
                    className={styles["teamLogo"]}
                  />
                </div>
              </div>
            )}
          </div>

          {pastJobs.length > 0 && (
            <div>
              <h2 className="title title--fs24black">Previous Clubs</h2>
              <div className={styles["coachCareer"]}>
                {pastJobs?.map((job) => (
                  <div key={job.team.id} className={styles["jobDetails"]}>
                    <h4>{job.team.name}</h4>
                    <p>
                      <strong>Start:</strong> {job.start}
                    </p>
                    <p>
                      <strong>End:</strong> {job.end}
                    </p>
                    <img
                      src={job.team.logo}
                      alt={job.team.name}
                      className={styles["teamLogo"]}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No coach found for season {season}.</p>
      )}
    </div>
  );
};
