import { useEffect, useState } from "react";
import { countriesApi } from "../../../../api/countries-api";
import type { LeagueSelect, CountryWithLeagues } from "./countries-types";
import styles from "./countries-list.module.scss";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";

const CountriesList = ({
  onLeagueSelect,
  onSeasonSelect,
  selectedSeason,
}: LeagueSelect) => {
  const [countries, setCountries] = useState<CountryWithLeagues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountriesAndLeagues = async () => {
      try {
        setLoading(true);
        const data = await countriesApi.get();
        if (!data) {
          return;
        }
        const countriesWithLeagues: CountryWithLeagues[] = data.response.map(
          ({ country, league }) => ({
            ...country,
            leagues: league ? [league] : [],
          })
        );

        // Sprawdzenie, czy istnieje więcej niż jedna liga w danym kraju
        const countriesMap = new Map<string, CountryWithLeagues>();
        countriesWithLeagues.forEach((country) => {
          const countryId = country.code ?? country.name; // Jeśli country.code jest null, użyj country.name
          if (countriesMap.has(countryId)) {
            countriesMap.get(countryId)!.leagues.push(...country.leagues); // Dodanie kolejnej ligi do istniejącego kraju
          } else {
            countriesMap.set(countryId, country); // Dodanie nowego kraju z ligą
          }
        });

        setCountries(Array.from(countriesMap.values())); // Ustawienie unikalnych krajów
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesAndLeagues();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryClick = (countryCode: string) => {
    setExpandedCountries((prevExpandedCountries) => {
      // Sprawdzamy, czy kraj jest już rozwinięty
      if (prevExpandedCountries.includes(countryCode)) {
        // Jeśli jest rozwinięty, usuwamy go (zamykanie)
        return prevExpandedCountries.filter((code) => code !== countryCode);
      } else {
        // Jeśli nie jest rozwinięty, dodajemy go (otwieranie)
        return [...prevExpandedCountries, countryCode];
      }
    });
  };

  const handleLeagueClick = (leagueId: number) => {
    onLeagueSelect(leagueId);
  };

  return (
    <div className={styles["countries-container"]}>
      <h2 className={"title title--fs24"}>All competitions</h2>
      <div className={styles["countries-container__season-choose"]}>
        <label htmlFor="year">Season: </label>
        <select
          id="year"
          name="year"
          className={styles["year-select"]}
          onChange={(event) => onSeasonSelect(event.target.value)}
          value={selectedSeason || "2023"}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className={styles["search-container"]}>
        <svg
          className={styles["search-container__search-icon"]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Filtr"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles["search-container__search-input"]}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["countries-list"]}>
          {filteredCountries.map((country) => {
            const countryId = country.code ?? country.name;
            return (
              <div key={countryId}>
                <button
                  className={`${styles["country-item"]} ${
                    expandedCountries.includes(countryId)
                      ? styles["country-item--expanded"]
                      : ""
                  } ${
                    expandedCountries.includes(countryId)
                      ? styles["country-item--active"]
                      : ""
                  }`}
                  onClick={() => handleCountryClick(countryId)}
                >
                  <div className={styles["country-flag"]}>
                    {country.flag ? (
                      <img src={country.flag} alt={`${country.name} flag`} />
                    ) : (
                      <div
                        className={styles["country-flag__flag-placeholder"]}
                      ></div>
                    )}
                  </div>
                  <span>{country.name}</span>
                  <svg
                    className={`${styles["country-item__chevron-icon"]} ${
                      expandedCountries.includes(countryId)
                        ? styles["country-item__chevron-icon--expanded"]
                        : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedCountries.includes(countryId) && (
                  <div className={styles["country-leagues"]}>
                    {country.leagues.map((league) => (
                      <button
                        key={league.id}
                        className={`${styles["country-item"]} ${styles["country-item--league-item"]}`}
                        onClick={() => handleLeagueClick(league.id)}
                      >
                        <img
                          src={league.logo}
                          alt={league.name}
                          className={styles["country-leagues__league-logo"]}
                        />
                        <span>{league.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
