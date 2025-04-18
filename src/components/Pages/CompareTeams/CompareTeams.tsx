import {TeamSelection} from "./H2HTeams/H2HTeams"
import styles from "./CompareTeams.module.scss";

export const CompareTeams = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <h1>Compare Teams</h1>
            </div>
            <TeamSelection />
            </div>
    )
}