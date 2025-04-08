import { useState } from "react";
import styles from "./Matches.module.scss";
import { FixturesResponse } from "./matches_types";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

type FixturesResponseProps = {
  fixtures: FixturesResponse;
};

export const FixturesData = ({ fixtures }: FixturesResponseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!fixtures || fixtures.length === 0) {
    return <div>No data for matches</div>;
  }

  const currentFixture = fixtures[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < fixtures.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className={styles["viewer"]}>
      <div className={styles["nav"]}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowBigLeft className={styles["arrow"]} size={50} />
        </button>
        <span>{`Match ${currentIndex + 1} of ${fixtures.length}`}</span>
        <button
          onClick={handleNext}
          disabled={currentIndex === fixtures.length - 1}
        >
          <ArrowBigRight className={styles["arrow"]} size={50} />
        </button>
      </div>

      <div className={styles["fixtureBox"]}>
        <h3>
          {currentFixture.league.name} – Round{" "}
          {currentFixture.league.round.split("-").pop()}
        </h3>

        <div className={styles["teams"]}>
          <div className={styles["date"]}>
            {formatDate(currentFixture.fixture.date)}
          </div>
          <div className={styles["item"]}>
            <img
              src={currentFixture.teams.home.logo}
              alt={currentFixture.teams.home.name}
            />
            <p>{currentFixture.teams.home.name}</p>
          </div>
          <span>
            {currentFixture.goals.home} : {currentFixture.goals.away}
          </span>
          <div className={styles["item"]}>
            <img
              src={currentFixture.teams.away.logo}
              alt={currentFixture.teams.away.name}
            />
            <p>{currentFixture.teams.away.name}</p>
          </div>
        </div>
        <div className={styles["wrapper"]}>
          <p>
            <strong>Referee:</strong>{" "}
            {currentFixture.fixture.referee || "No data"}
          </p>
          <p>
            <strong>Stadium:</strong> {currentFixture.fixture.venue.name} –{" "}
            {currentFixture.fixture.venue.city}
          </p>
        </div>
      </div>
    </div>
  );
};
