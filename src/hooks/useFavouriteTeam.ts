import { useEffect, useState } from "react";

type Fav = { id: number; name: string; logo: string } | null;
const ITEM = "favouriteTeam";
const EVENT = "favouriteTeamChanged";

export function useFavouriteTeam() {
  const [fav, setFav] = useState<Fav>(null);

  const read = () => {
    try {
      const raw = localStorage.getItem("favouriteTeam");
      setFav(raw ? JSON.parse(raw) : null);
    } catch {
      setFav(null);
    }
  };

  useEffect(() => {
    read();
    const onChange = () => read();
    window.addEventListener("favouriteTeamChanged", onChange);
    return () => window.removeEventListener("favouriteTeamChanged", onChange);
  }, []);

  const toggle = (team: { id: number; name: string; logo: string }) => {
    const next = fav && fav.id === team.id ? null : team;
    if (next) localStorage.setItem(ITEM, JSON.stringify(next));
    else localStorage.removeItem(ITEM);
    setFav(next);
    window.dispatchEvent(new CustomEvent(EVENT));
  };

  return { fav, toggle };
}
