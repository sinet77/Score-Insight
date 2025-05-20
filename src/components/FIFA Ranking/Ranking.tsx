import { getFifaRanking } from '@api/fifa_ranking';
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import styles from './Ranking.module.scss';
import fifa_logo from "../../assets/fifa_logo.png"
import { SearchBar } from '@components/ui/SearchBar/SearchBar';

type FifaRankingProps = {
    rank: number;
    flag: string;
    name: string;
    previous_rank: number;
    points: number;
    previous_points: number;
};

export const FifaRanking = () => {
    const [ranking, setRanking] = useState<FifaRankingProps[]>([]);
    const [filteredRanking, setFilteredRanking] = useState<FifaRankingProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateDate, setUpdateDate] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                setLoading(true);
                const result = await getFifaRanking();
                setRanking(result.ranking);
                setFilteredRanking(result.ranking);
                setUpdateDate(result.date);
            } catch (error) {
                console.error("Error fetching FIFA ranking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    useEffect(() => {
        const filtered = ranking.filter((team) =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRanking(filtered);
    }, [searchTerm, ranking]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className={styles["main"]}>
            <div className={styles["header"]}>
                <img src={fifa_logo} alt={"fifa logo"} className={styles["fifa_logo"]} />
                <h2 className="title title--fs24">World Ranking</h2>
            </div>
            <div className={styles["date"]}>
                <SearchBar
                    placeholder="Search for country"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <h3 className={styles["date"]}>Last update: {updateDate}</h3>
            <table className={styles["rankingTable"]}>
                <thead>
                    <tr className={styles["tableHeader"]}>
                        <div className={styles["wrapper-tableHeader"]}>
                            <th>Rank</th>
                            <th>Team</th>
                        </div>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRanking.map((team, index) => (
                        <tr key={index} className={styles["item"]}>
                            <td className={styles["wrapper"]}>
                                <td className={styles["tableCell"]}>{team.rank}</td>
                                <td className={styles["flag-name-cell"]}>
                                    <img
                                        src={team.flag}
                                        alt={`${team.name} flag`}
                                        className={styles["flag"]}
                                    />
                                    {team.name}
                                </td>
                            </td>
                            <td className={styles["tableCell"]}>{team.points.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
