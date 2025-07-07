import { routes } from '../../routes';
import { FaUsers, FaUser, FaNewspaper, FaTrophy } from 'react-icons/fa';
import { GiSoccerBall } from "react-icons/gi";

export const divisions = [
  { name: "Choose league", path: "#choose-league", icon: <GiSoccerBall /> },
  { name: "H2H Teams", path: routes.compareTeams, icon: <FaUsers /> },
  { name: "H2H Players", path: routes.comparePlayers, icon: <FaUser /> },
  { name: "News", path: "#news", icon: <FaNewspaper /> },
  { name: "FIFA World Ranking", path: routes.ranking, icon: <FaTrophy /> },
];