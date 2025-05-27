import styles from "./Footer.module.scss";
import logo from "../../assets/football_logo_transparent.png";


type FooterProps = {
  scrollToLeagues: () => void;
  setSelectedLeagueId: (id: number) => void;
};

export const Footer = ({ scrollToLeagues, setSelectedLeagueId }: FooterProps) => {
  const handleGoHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLeagueClick = (leagueId: number) => {
    setSelectedLeagueId(leagueId);
    scrollToLeagues();
  };
    return (
        <footer className={styles["container"]}>
            <div className={styles["content"]}>
                <section className={styles["infoSection"]}>
                    <h2>Information</h2>
                    <p>
                        Our platform provides detailed football data across various leagues from multiple countries. You can explore final league standings for three available seasons: <strong>2021, 2022, and 2023</strong>. Due to API limitations, only these seasons are currently supported.
                    </p>
                    <p>
                        Each league table displays final rankings, including team points, number of wins, losses, draws, goal difference, and other key statistics. By selecting a team, you can access more in-depth information such as recent match results, team stats, and player details.
                    </p>
                    <p>
                        You can also compare <strong>teams</strong> and <strong>players</strong> across different seasons — see how their performance evolved year over year. Every match page includes match-specific statistics, offering a clear view of how each game played out.
                    </p>
                    <p>
                        To make tracking easier, you can mark your favorite teams and players for quicker access to their stats and match history.
                    </p>
                    <p>
                        Whether you're checking historical performance or analyzing seasonal trends, our tools give you everything you need — clearly organized and easy to explore.
                    </p>
                </section>
                <section className={styles["linksSection"]}>
                    <button onClick={handleGoHome}>
                        <img src={logo} alt="Football App Logo" className="navbar__logo" />
                    </button>
                    
                </section>
          <div className={styles["topLeagues"]}>
            <h3>Top Leagues</h3>
            <ul>
              <li><button onClick={() => handleLeagueClick(39)}>Premier League</button></li>
              <li><button onClick={() => handleLeagueClick(140)}>La Liga</button></li>
              <li><button onClick={() => handleLeagueClick(135)}>Serie A</button></li>
              <li><button onClick={() => handleLeagueClick(78)}>Bundesliga</button></li>
              <li><button onClick={() => handleLeagueClick(61)}>Ligue 1</button></li>
            </ul>
          </div>
            </div>
        </footer>
    )
}